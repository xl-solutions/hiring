import { StocksRepositoryRequest } from "../../repositories/request-data-stocks/stokcsRepositoryRequest";

const stocksRepositoryRequest = new StocksRepositoryRequest();

interface IRequest{
    stock_name: string,
    stocks: string[]
}

class ListCompareStocksUseCase{
    constructor(){}

    async execute({stock_name, stocks}: IRequest): Promise<any>{
        stocks.unshift(stock_name)

        const compare = await stocksRepositoryRequest.compareStocks(stocks);

        return compare;
    }
}

export { ListCompareStocksUseCase };