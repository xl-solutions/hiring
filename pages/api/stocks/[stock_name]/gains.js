import AlphaVantageService from "@/Backend/services/alphaVantageService"
import DataFormat from "../../../../utils/dateUtils";
import formatCurrency from "../../../../utils/priceUtils";
export default async function handler(req, res) {
    const { stock_name,purchasedAmount, purchasedAt } = req.query;
   
    try {
        const arrPrices = await AlphaVantageService.getGains(stock_name,purchasedAmount,purchasedAt)
        

        console.log(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao obter cotação.' });
    }
}