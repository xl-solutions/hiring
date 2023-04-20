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
}

export default AlphaVantageService;