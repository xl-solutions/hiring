import { StocksRepositoryRequest } from "../../repositories/request-data-stocks/stokcsRepositoryRequest";

const stocksRepositoryRequest = new StocksRepositoryRequest();

interface IRequest{
    stock_name: string,
    from: string,
    to:string,
}

class ListHistoricPricesUseCase{
    constructor(){}

    async execute({ stock_name, from, to}: IRequest): Promise<any>{
        const historicPrices = await stocksRepositoryRequest.findByHistoricPrices(
            stock_name,
            from,
            to
        );
        return historicPrices;
    };

}

export { ListHistoricPricesUseCase };