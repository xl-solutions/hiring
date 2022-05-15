import axios from 'axios'
import { AppError } from '../../../../shared/errors/AppError';
import { IStocksRepositoryRequest } from '../IStocksRepositoryRequest';

class StocksRepositoryRequestTest implements IStocksRepositoryRequest {

    private tokenAPI = "demo";

    constructor(){}

    async findByRecentQuotes(stock_name: string): Promise<any>{
        try{
            const response = axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock_name}&apikey=H1PPV0CE7T26GBA9`, {})
                .then(response => {
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

    async findByHistoricPrices(stock_name:string): Promise<any>{
        try{
            const response = axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock_name}&apikey=${this.tokenAPI}`, {})
                .then(response => {
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

    async compareStocks(stocks: string[]): Promise<any>{
        try{
            let result:any[] = [];

            for(let i in stocks){
                const response = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stocks[i]}&apikey=1JUEW1VRUMQ20WA3`, {})
                .then(response => {
                    result.push(response);
                })
                .catch(error => {
                    return error
                });
            }
            return result;

        }catch (error){
            return error
        }
    }

    async findByProjectGains(stock_name:string): Promise<any>{
        try{
            const response = axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock_name}&apikey=${this.tokenAPI}`, {})
                .then(response => {
                    return response;
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

export { StocksRepositoryRequestTest };