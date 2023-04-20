import AlphaVantageService from "@/Backend/services/alphaVantageService"
import DataFormat from "../../../../utils/dateUtils";
import formatCurrency from "../../../../utils/priceUtils";
export default async function handler(req, res) {
    const { stock_name, from, to } = req.query;

    try {
        const arrPrices = await AlphaVantageService.getHistoricalPrices(stock_name, from, to)
        
        let oppening = arrPrices[1].price
        let close = arrPrices[arrPrices.length - 1 ].price
        let low = arrPrices[1].price
        let high = arrPrices[1].price
        for (let item of arrPrices) {
            if (item.price < low) {
                low = item.price
            }
            if (item.price > high) {
                high = item.price
            }
        }
        const toData = new Date(to);
        toData.setDate(toData.getDate() - 1);
        const pricedAt = toData.toISOString();
        oppening = formatCurrency(oppening)
        low = formatCurrency(low)
        high = formatCurrency(high)
        close = formatCurrency(close)
        const body = {
            oppening,
            low,
            high,
            close,
            pricedAt
        }
        res.status(500).json(body)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao obter cotação.' });
    }
}