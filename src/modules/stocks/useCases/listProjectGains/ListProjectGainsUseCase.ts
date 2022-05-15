import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { convertAndParseFloat } from "../../../../shared/provider/ConvertNumbers";
import { IStocksRepositoryRequest } from "../../repositories/IStocksRepositoryRequest";

interface IRequest{
    stock_name: string,
    purchasedAmount: number,
    purchasedAt: string,
}

@injectable()
class ListProjectGainsUseCase{
    constructor(
        @inject("StocksRepositoryRequest")
        private stocksRepositoryRequest: IStocksRepositoryRequest
    ){}

    private messageError = "Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency.";
    private messageInvalidApi = "Invalid API call. Please retry or visit the documentation (https://www.alphavantage.co/documentation/) for TIME_SERIES_DAILY."

    async execute({ stock_name, purchasedAmount, purchasedAt}: IRequest): Promise<any>{
        const historicPrices = await this.stocksRepositoryRequest.findByProjectGains(
            stock_name,
            purchasedAmount,
            purchasedAt
        );

        if(historicPrices.data['Error Message']){
            throw new AppError("Name invalid");
        }

        const projectGains = {}
        const resposeHeader = historicPrices.data['Meta Data'];
        const responseBody  = historicPrices.data['Time Series (Daily)']
        
        if(historicPrices.data.Note){
            throw new AppError(this.messageError);
        }

        if(responseBody[purchasedAt] == undefined){
            throw new AppError("Date invalid");
        }

        if(historicPrices.data['Error Message']){
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
    };
}

export { ListProjectGainsUseCase };