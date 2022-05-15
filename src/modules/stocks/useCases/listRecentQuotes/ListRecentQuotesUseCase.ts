import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { convertDateToUTC } from "../../../../shared/provider/ConvertDateUtc";
import { convertAndParseFloat } from "../../../../shared/provider/ConvertNumbers";
import { IStocksRepositoryRequest } from "../../repositories/IStocksRepositoryRequest";

interface IRequest{
    stock_name: string;
}

@injectable()
class ListRecentQuotesUseCase{
    constructor(
        @inject("StocksRepositoryRequest")
        private stocksRepositoryRequest: IStocksRepositoryRequest
    ){}
    
    private messageError = "Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency.";
    
    async execute({stock_name}: IRequest): Promise<any>{
        const quotes = await this.stocksRepositoryRequest.findByRecentQuotes(stock_name);
        
        const responseData = {};
        
        const responseBody = quotes.data['Global Quote'];

        if(quotes.data.Note){
            throw new AppError(this.messageError);
        }
        
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
    }
}

export { ListRecentQuotesUseCase };