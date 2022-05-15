import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { convertDate, convertDateToUTC } from "../../../../shared/provider/ConvertDateUtc";
import { convertAndParseFloat } from "../../../../shared/provider/ConvertNumbers";
import { IStocksRepositoryRequest } from "../../repositories/IStocksRepositoryRequest";

interface IRequest{
    stock_name: string,
    from: string,
    to:string,
}

@injectable()
class ListHistoricPricesUseCase{
    constructor(
        @inject("StocksRepositoryRequest")
        private stocksRepositoryRequest: IStocksRepositoryRequest
    ){}

    private messageError = "Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency.";

    async execute({ stock_name, from, to}: IRequest): Promise<any>{
        const historicPrices = await this.stocksRepositoryRequest.findByHistoricPrices(
            stock_name,
            from,
            to
        );

        const responseData = {};
        const prices = [];
        let pricesObj = {};

        if(historicPrices.data['Error Message']){
            throw new AppError("Name invalid");
        }

        if(historicPrices.data.Note){
            throw new AppError(this.messageError);
        }

        const resposeHeader = historicPrices.data['Meta Data'];
        const responseBody  = historicPrices.data['Time Series (Daily)']
        const responseDates = Object.keys(responseBody);

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
    };
}

export { ListHistoricPricesUseCase };