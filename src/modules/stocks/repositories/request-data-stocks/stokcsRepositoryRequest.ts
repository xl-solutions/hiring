import axios from 'axios'
import { AppError } from '../../../../shared/errors/AppError';

const tokenAPI = "EZ3IPW2YUAGT6T0O";
const messageError = "Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency.";

class StocksRepositoryRequest {

    async findByRecentQuotes(stock_name: string){
        try{
            const response = axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock_name}&apikey=${tokenAPI}`, {})
                .then(response => {
                    const responseData = {};
                    
                    if(response.data.Note){
                        throw new AppError(messageError);
                    }

                    if(response.data['Global Quote']['01. symbol'] != undefined){
                        Object.assign(responseData,{
                            name: response.data['Global Quote']['01. symbol'],
                            lastPrice: (parseFloat(response.data['Global Quote']['05. price']).toFixed(2)),
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

}


export { StocksRepositoryRequest };


