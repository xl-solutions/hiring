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
  static async getGains(stockName, purchasedAmount, purchasedAt) {
    try {
      const response = await axios.get(`/stocks/${stockName}/gains`, {
        params: {
          purchasedAmount,
          purchasedAt,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao buscar ganhos');
    }
  }
}

export default AlphaVantageService;