import axios from '../api/axiosConfig';
import formatCurrency from '../../../utils/priceUtils';
import DataFormat from '../../../utils/date8601';
import { BadRequestError } from '@/shared/error/BadRequestError';
class AlphaVantageService {
  static async getCotacaoMaisRecente(symbol) {
    try {
      const response = await axios.get('', {
        params: {
          function: 'GLOBAL_QUOTE',
          symbol: symbol,
        },
      });
      return response.data['Global Quote']['05. price'];
    } catch (error) {

      throw new BadRequestError('Erro ao buscar cotação');
    }
  }
  static async getHistoricalPrices(stockName, from, to) {
    try {
      const params = {
        function: 'TIME_SERIES_DAILY_ADJUSTED',
        symbol: stockName,
      };

      if (from) {
        params.outputsize = 'full';
        params.start_date = from;
      }

      if (to) {
        params.end_date = to;
      }

      const response = await axios.get('', {
        params,
      });

      const arrPrices = [];
      for (const [date, values] of Object.entries(response.data['Time Series (Daily)'])) {
        if (date >= from && date <= to) {
          arrPrices.push({
            date,
            price: values['4. close'],
          });
        }
      }

      return arrPrices;
    } catch (error) {

      throw new BadRequestError('Erro ao obter histórico de preços');
    }
  }
  static async getGains(stockName, purchasedAmount, purchasedAt) {
    try {

      const currentPrice = await this.getCotacaoMaisRecente(stockName);
      if (!currentPrice) {
        const errorMessage = "Api não conseguiu buscar informações desta ação";
         throw new Error(errorMessage);
      }
      let data = new Date()
      data = await DataFormat(data);

      const historicalPrices = await this.getHistoricalPrices(stockName, purchasedAt, data);
      
      if (!historicalPrices) {
        const errorMessage = "Api não consegui Buscar informações desta ação para está data";
        throw new Error(errorMessage);
      }


      let lastObj = historicalPrices[historicalPrices.length - 1]
      
      purchasedAt = historicalPrices[historicalPrices.length - 1].date;
      
      let price = lastObj.price
      
      

      let lastPrice = currentPrice ;
      
      
     
      let capitalGains = (lastPrice - price) * purchasedAmount;
      capitalGains = capitalGains !== null ? formatCurrency(capitalGains) : null;
      
      lastPrice = formatCurrency(lastPrice);
      let purchasedPrice = formatCurrency(price);
      

      const result = {
        name: stockName,
        purchasedAmount: purchasedAmount,
        purchasedAt: purchasedAt,
        purchasedPrice: purchasedPrice,
        lastPrice: lastPrice,
        capitalGains: capitalGains
      };
      
      return result
    } catch (error) {

      throw new BadRequestError('Erro ao projetar ganhos');
    }
  }

}

export default AlphaVantageService;