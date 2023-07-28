import handleResponse from "@/shared/services/handleResponse";
import axios from "axios";
export  async function getHistoricalPrice(nameAction,from,to) {
        const response = await axios.get(`/api/stocks/${nameAction}/history?from=${from}&to=${to}`);
        return handleResponse(response)
}
export  async function getStock(newStock) {
    const response = await axios.get(`/api/stocks/${newStock}/quote`);
    return handleResponse(response)
}
export  async function getGains(stock_name, purchasedAmount, purchasedAt) {
    const response = await axios.get(`/api/stocks/${stock_name}/gains?purchasedAmount=${purchasedAmount}&purchasedAt=${purchasedAt}`);
    return handleResponse(response)
}