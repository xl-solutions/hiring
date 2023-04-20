import axios from '../api/axiosConfig';
import formatCurrency from '../../../utils/priceUtils';
import DataFormat from '../../../utils/date8601';
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
      console.error(error);
      throw new Error('Erro ao buscar cotação');
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
      console.error(error);
      throw new Error('Erro ao obter histórico de preços');
    }
  }
  static async getGains(stockName, purchasedAmount, purchasedAt) {
    try {

      const currentPrice = await this.getCotacaoMaisRecente(stockName);
      if(!currentPrice){
        return "Api não consegui Buscar informações desta ação para está data"
      }
      let data = new Date()
      data = DataFormat(data);

      const historicalPrices = await this.getHistoricalPrices(stockName, purchasedAt, data);
      if(!historicalPrices){
        return "Api não consegui Buscar informações desta ação para está data"
      }
      let purchasedPrice = historicalPrices.find(price => price.date === purchasedAt)?.price;

      let lastPrice = currentPrice;

      if (!purchasedPrice) {
        throw new Error('Não há dados de preços na data de compra');
      }

      let capitalGains = (lastPrice - purchasedPrice) * purchasedAmount;

      lastPrice = formatCurrency(lastPrice)
      capitalGains = formatCurrency(capitalGains)
      purchasedPrice = formatCurrency(purchasedPrice)
      
      const result = {
        name: stockName,
        purchasedAmount: purchasedAmount,
        purchasedAt: purchasedAt,
        priceAtDate: purchasedPrice,
        lastPrice: lastPrice,
        capitalGains: capitalGains
      };

      return result;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao projetar ganhos');
    }
  }

}

export default AlphaVantageService;