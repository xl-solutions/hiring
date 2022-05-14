import axios from 'axios'
import { response } from 'express';
import { AppError } from '../../../../shared/errors/AppError';
import { convertDate, convertDateToUTC } from '../../../../shared/provider/ConvertDateUtc';
import { convertAndParseFloat } from '../../../../shared/provider/ConvertNumbers';
import { IStocksRepositoryRequest } from './IStocksRepositoryRequest';

class StocksRepositoryRequest implements IStocksRepositoryRequest {
    private tokenAPI = "EZ3IPW2YUAGT6T0O";
    // private tokenAPI = "demo";
    private messageError = "Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency.";
    private messageInvalidApi = "Invalid API call. Please retry or visit the documentation (https://www.alphavantage.co/documentation/) for TIME_SERIES_DAILY."

    constructor(){}

    async findByRecentQuotes(stock_name: string): Promise<any>{
        try{
            const response = axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock_name}&apikey=${this.tokenAPI}`, {})
                .then(response => {
                    const responseData = {};

                    if(response.data.Note){
                        throw new AppError(this.messageError);
                    }
                    
                    const responseBody = response.data['Global Quote'];
                    
                    let symbol = responseBody['01. symbol'];
                    let lastPrice = convertAndParseFloat(responseBody['05. price']);
                    let priceAt = convertDateToUTC(responseBody['07. latest trading day'])

                    if(symbol != undefined){
                        Object.assign(responseData,{
                            name: symbol,
                            lastPrice: lastPrice,
                            pricedAt: priceAt
                        })
                        return responseData
                    }

                    if(responseBody){
                        throw new AppError("Stock name invalid");
                    }
                })
                .catch(error => {
                    return error
                });

            return response
        }catch (error){
            throw new AppError(`Message error: ${error}`);
        }
    }

    async findByHistoricPrices(stock_name:string, from:string, to:string): Promise<any>{
        try{
            const response = axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock_name}&apikey=${this.tokenAPI}`, {})
                .then(response => {
                    const responseData = {};
                    const prices = [];
                    let pricesObj = {};

                    if(response.data.Note){
                        throw new AppError(this.messageError);
                    }

                    const resposeHeader = response.data['Meta Data'];
                    const responseBody  = response.data['Time Series (Daily)']
                    const responseDates = Object.keys(responseBody);

                    if(response.data.Note){
                        throw new AppError(this.messageError);
                    }

                    let symbolQuote = resposeHeader['2. Symbol'];
                    
                    let fromDate = convertDate(from);
                    let toDate = convertDate(to);

                    for(let i in responseDates){
                        
                        let allDates = convertDate(responseDates[i]);
                        
                        if(responseBody[from] && responseBody[to]){
                            
                            if(allDates >= fromDate && allDates <= toDate){

                                let opening = convertAndParseFloat(responseBody[responseDates[i]]["1. open"]);
                                let low = convertAndParseFloat(responseBody[responseDates[i]]["2. high"]);
                                let high = convertAndParseFloat(responseBody[responseDates[i]]["3. low"]);
                                let closing = convertAndParseFloat(responseBody[responseDates[i]]["4. close"]);
                                let priceAt = convertDateToUTC(responseDates[i]);

                                pricesObj = {
                                    opening: opening,
                                    low: low,
                                    high: high,
                                    closing: closing,
                                    pricedAt: priceAt 
                                }
                                prices.push(pricesObj);
                            }
                        }else{
                            throw new AppError("Date invalid")
                        }
                    }

                    Object.assign(responseData,{
                        name: symbolQuote,
                        prices: prices.reverse()
                    })
                
                    return responseData
                })
                .catch(error => {
                    return error
                });

            return response

        }catch (error){
            throw new AppError(`Message error: ${error}`);
        }
    }

    async compareStocks(stocks: string[]): Promise<any>{
        try{
            const responseData = {};
            const lastPrices: any[] = [];
            let itens = {};
            let error;

            for(let i in stocks){
                const response = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stocks[i]}&apikey=${this.tokenAPI}`, {})
                .then(response => {

                    const responseBody = response.data['Global Quote'];

                    if(response.data.Note){
                        error = 'Limit'
                    }

                    if(responseBody['01. symbol'] == undefined){
                        error = 'NameInvalid';
                    }

                    let name = responseBody['01. symbol'];
                    let lastPrice = convertAndParseFloat(responseBody['05. price']);

                    let date = responseBody['07. latest trading day'];
                    let priceAt = convertDateToUTC(date);

                    if(name != undefined){
                        itens = {
                            name: name,
                            lastPrice: lastPrice,
                            pricedAt: priceAt
                        };

                        lastPrices.push(itens)
                    }
                })
                .catch(error => {
                    return error
                });
            }

            if(error == 'Limit'){
                throw new AppError(this.messageError);
            }else if(error == 'NameInvalid'){
                throw new AppError("Name Invalid");
            }

            if(lastPrices.length > 1){
                Object.assign(responseData,{
                    lastPrice: lastPrices
                })
    
                return responseData
            }
        }catch (error){
            return error
        }
    }

    async findByProjectGains(stock_name:string, purchasedAmount:number, purchasedAt:string): Promise<any>{
        try{
            const response = axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock_name}&apikey=${this.tokenAPI}`, {})
                .then(response => {
                    const projectGains = {}
                    const resposeHeader = response.data['Meta Data'];
                    const responseBody  = response.data['Time Series (Daily)']
                    
                    if(response.data.Note){
                        throw new AppError(this.messageError);
                    }

                    if(responseBody[purchasedAt] == undefined){
                        throw new AppError("Date invalid");
                    }


                    if(response.data['Error Message']){
                        throw new AppError(this.messageInvalidApi);
                    }
                    
                    let symbolQuote = resposeHeader['2. Symbol'];
                    let purchasedAmountNumber = Number(purchasedAmount)
                    
                    let priceAtDate = convertAndParseFloat(responseBody[purchasedAt]['4. close']);

                    let lastPriceDate = resposeHeader['3. Last Refreshed']
                    let lastPrice = convertAndParseFloat(responseBody[lastPriceDate]['4. close']);
                    
                    let capitalGains = (lastPrice * purchasedAmountNumber) - (priceAtDate * purchasedAmountNumber)

                    Object.assign(projectGains, {
                        name: symbolQuote,
                        purchasedAmount: purchasedAmountNumber,
                        purchasedAt: purchasedAt,
                        priceAtDate : priceAtDate,
                        lastPrice: lastPrice,
                        capitalGains: capitalGains
                    })

                    return projectGains;
                })
                .catch(error => {
                    return error
                });

            return response

        }catch (error){
            throw new AppError(`Message error: ${error}`);
        }
    }
}

export { StocksRepositoryRequest };