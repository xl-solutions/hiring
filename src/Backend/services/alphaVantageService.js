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
      console.log(params)
      const response = await axios.get('', {
        params,
      });
      console.log(response)
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


      const historicalPrices = await this.getHistoricalPrices(stockName);

      // Filtrar apenas os preços a partir da data de compra
      const purchasedPrices = historicalPrices.filter(price => {
        return price.date >= purchasedAt;
      });

      // Obter o preço de compra da ação
      const purchasedPrice = purchasedPrices[0].price;

      // Calcular o lucro ou prejuízo
      const profitOrLoss = (currentPrice - purchasedPrice) * purchasedAmount;

      // Formatar o valor para exibição
      const formattedProfitOrLoss = this.formatValue(profitOrLoss);

      // Retornar o lucro ou prejuízo
      return formattedProfitOrLoss;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao projetar ganhos');
    }
  }

}

export default AlphaVantageService;