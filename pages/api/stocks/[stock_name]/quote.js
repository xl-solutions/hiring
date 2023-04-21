import AlphaVantageService from "@/Backend/services/alphaVantageService"
import DataFormat from "../../../../utils/dateUtils";
import formatCurrency from "../../../../utils/priceUtils";
export default async function handler(req, res) {
    const { stock_name } = req.query;
    try {
        let price = await AlphaVantageService.getCotacaoMaisRecente(stock_name);
        if(!price){
            throw new Error("erro ao busacr esta ação")
        }
        let date = new Date()
        date = DataFormat(date)
        price = formatCurrency(price)
        const body = {
            name: stock_name,
            price: price,
            date: date
        }
        

        res.status(200).json(body);
    } catch (error) {
        
        res.status(500).json({ error: 'Erro ao obter cotação.' });
    }
}