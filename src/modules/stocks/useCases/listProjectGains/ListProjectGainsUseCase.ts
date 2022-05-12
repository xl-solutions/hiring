import { StocksRepositoryRequest } from "../../repositories/request-data-stocks/stokcsRepositoryRequest";

const stocksRepositoryRequest = new StocksRepositoryRequest();

interface IRequest{
    stock_name: string,
    purchasedAmount: number,
    purchasedAt: string,
}

class ListProjectGainsUseCase{
    constructor(){}

    async execute({ stock_name, purchasedAmount, purchasedAt}: IRequest): Promise<any>{
        const historicPrices = await stocksRepositoryRequest.findByProjectGains(
            stock_name,
            purchasedAmount,
            purchasedAt
        );
        return historicPrices;
    };
}

export { ListProjectGainsUseCase };