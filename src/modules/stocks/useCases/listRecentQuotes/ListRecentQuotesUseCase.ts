import { StocksRepositoryRequest } from "../../repositories/request-data-stocks/stokcsRepositoryRequest";

const stocksRepositoryRequest = new StocksRepositoryRequest();

interface IRequest{
    stock_name: string;
}

class ListRecentQuotesUseCase{
    constructor(){}

    async execute({stock_name}: IRequest): Promise<any>{
        const quotes = await stocksRepositoryRequest.findByRecentQuotes(stock_name);
        
        return quotes
    }
}

export { ListRecentQuotesUseCase };