import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { convertDateToUTC } from "../../../../shared/provider/ConvertDateUtc";
import { convertAndParseFloat } from "../../../../shared/provider/ConvertNumbers";
import { IStocksRepositoryRequest } from "../../repositories/IStocksRepositoryRequest";

interface IRequest{
    stock_name: string,
    stocks: string[]
}

@injectable()
class ListCompareStocksUseCase{
    constructor(
        @inject("StocksRepositoryRequest")
        private stocksRepositoryRequest: IStocksRepositoryRequest
    ){}

    private messageError = "Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency.";

    async execute({stock_name, stocks}: IRequest): Promise<any>{
        stocks.unshift(stock_name)
        
        const compare = await this.stocksRepositoryRequest.compareStocks(stocks);

        const responseData = {};
        const lastPrices: any[] = [];
        let itens = {};
        
        for(let i = 0; i<compare.length; i++){
        
            const responseBody = compare[i].data['Global Quote'];
    
            if(compare[i].data.Note){
                throw new AppError(this.messageError);
            }else{
                if(responseBody['01. symbol'] === undefined){
                    throw new AppError(`Name Invalid: ${stocks[i]}`);
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
            }
        }

        if(lastPrices.length >= 1){
            Object.assign(responseData,{
                lastPrice: lastPrices
            })

            return responseData
        }
    }
}

export { ListCompareStocksUseCase };