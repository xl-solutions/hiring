import AlphaVantageService from "../../../../src/Backend/services/alphaVantageService"

export default async function handler(req, res) {

    try {
      const { stocks } = req.body;
      const { stock_name } = req.query;
      
      if (!stocks) {
        throw new Error('É necessário informar a lista de ações para comparação');
      }
      
      const result = await AlphaVantageService.compareStocks(stock_name, { stocks });
  
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(error.status || 500).json({ error: error.message || 'Ocorreu um erro ao processar a requisição' });
    }
  }