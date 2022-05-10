import axios from 'axios'
import { response } from 'express';
import { AppError } from '../../../../shared/errors/AppError';

class StocksRepositoryRequest {
    private tokenAPI = "EZ3IPW2YUAGT6T0O";
    // private tokenAPI = "demo";
    private messageError = "Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency.";

    constructor(){}

    async findByRecentQuotes(stock_name: string): Promise<any>{
        try{
            const response = axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock_name}&apikey=${this.tokenAPI}`, {})
                .then(response => {
                    const responseData = {};
                    
                    if(response.data.Note){
                        throw new AppError(this.messageError);
                    }

                    if(response.data['Global Quote']['01. symbol'] != undefined){
                        Object.assign(responseData,{
                            name: response.data['Global Quote']['01. symbol'],
                            lastPrice: parseFloat(response.data['Global Quote']['05. price']).toFixed(2),
                            pricedAt: response.data['Global Quote']['07. latest trading day']
                        })
    
                        return responseData
                    }

                    if(response.data['Global Quote']){
                        throw new AppError("Stock name invalid");
                    }

                    return response
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

                    if(response.data.Note){
                        throw new AppError(this.messageError);
                    }
                    
                    const infosHeader = response.data['Meta Data']
                    const infosDates = response.data['Time Series (Daily)'];
                    const infosDateObj = Object.keys(infosDates);

                    for(let i in infosDateObj){
                        if(infosDates[from] && infosDates[to]){
                            if(infosDateObj[i] === from){
                                prices.push({
                                    opening: parseFloat(infosDates[from]["1. open"]).toFixed(2),
                                    low: parseFloat(infosDates[from]["2. high"]).toFixed(2),
                                    high: parseFloat(infosDates[from]["3. low"]).toFixed(2),
                                    closing: parseFloat(infosDates[from]["4. close"]).toFixed(2),
                                    pricedAt: infosDateObj[i]
                                })
                            }
                            if(infosDateObj[i] === to){
                                prices.push({
                                    opening: parseFloat(infosDates[to]["1. open"]).toFixed(2),
                                    low: parseFloat(infosDates[to]["2. high"]).toFixed(2),
                                    high: parseFloat(infosDates[to]["3. low"]).toFixed(2),
                                    closing: parseFloat(infosDates[to]["4. close"]).toFixed(2),
                                    pricedAt: infosDateObj[i]
                                })
                            }
                        }else{
                            throw new AppError("Date invalid")
                        }
                    }

                    Object.assign(responseData,{
                        name: infosHeader["2. Symbol"],
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
            let itens = {} as any;
            const lastPrices: string[] = [];
            for(let i in stocks){
                const response = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stocks[i]}&apikey=${this.tokenAPI}`, {})
                .then(response => {
                    if(response.data.Note){
                        throw new AppError(this.messageError);
                    }

                    if(response.data['Global Quote']['01. symbol'] != undefined){
                        itens = {
                            name: response.data['Global Quote']['01. symbol'] as string,
                            lastPrice: parseFloat(response.data['Global Quote']['05. price']).toFixed(2),
                            pricedAt: response.data['Global Quote']['07. latest trading day'] as string
                        };

                        lastPrices.push(itens)
                    }

                })
                .catch(error => {
                    return error
                });
            }

            if(lastPrices.length > 1){
                Object.assign(responseData,{
                    lastPrice: lastPrices
                })
    
                return responseData
            }

            return response
        }catch (error){
            throw new AppError(`Message error: ${error}`);
        }
    }
}


export { StocksRepositoryRequest };


