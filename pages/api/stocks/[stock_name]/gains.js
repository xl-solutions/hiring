import AlphaVantageService from "@/Backend/services/alphaVantageService"
import DataFormat from "../../../../utils/dateUtils";
import formatCurrency from "../../../../utils/priceUtils";
export default async function handler(req, res) {
    const { stock_name,purchasedAmount, purchasedAt } = req.query;
   
    try {
        const response = await AlphaVantageService.getGains(stock_name,purchasedAmount,purchasedAt)
        res.status(200).json(response)
    } catch (error) {
        throw new ServerInternalError()
    }
}