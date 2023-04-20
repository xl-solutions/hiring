import axios from '../api/axiosConfig';

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

      const prices = [];
      for (const [date, values] of Object.entries(response.data['Time Series (Daily)'])) {
        if (date >= from && date <= to) {
          prices.push({
            date,
            price: values['4. close'],
          });
        }
      }
      return prices;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao obter histórico de preços');
    }
  }
  static async getGains(stockName, purchasedAmount, purchasedAt) {
    try {

      const currentPrice = await this.getCotacaoMaisRecente(stockName);

      let data = new Date()
      const ano = data.getFullYear();
      const mes = (data.getMonth() + 1).toString().padStart(2, '0');
      const dia = data.getDate().toString().padStart(2, '0');
      data = `${ano}-${mes}-${dia}`;

      const historicalPrices = await this.getHistoricalPrices(stockName, purchasedAt, data);
      
      const purchasedPrice = historicalPrices.find(price => price.date === purchasedAt)?.price;
     
      const lastPrice = currentPrice;

      if (!purchasedPrice) {
        throw new Error('Não há dados de preços na data de compra');
      }

      const capitalGains = (lastPrice - purchasedPrice) * purchasedAmount;
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