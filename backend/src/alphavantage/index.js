const axios = require('../client/client.js');
const apiKey = "demo"
// process.env.API_KEY

require('dotenv').config();

module.exports = {

    //Returns the most recent quote for the stock [Atual Price]
    async getQuoteStock(req, res) {
        try {
            const stock_name = req.params.stock_name;
            const data = (await axios.get(`query?function=GLOBAL_QUOTE&symbol=${stock_name}&apikey=${apiKey}`)).data;
            const response = {
                name: stock_name,
                lastPrice: (parseFloat(data['Global Quote']['05. price']).toFixed(2)),
                pricedAT: data['Global Quote']['07. latest trading day']
            }
            return res.status(200)
                .json(response);
        } catch (err) {
            res.status(400)
        }
    },


    //Get time Series
    async getTimeSeriesStock(req, res) {
        try {
            const stock_name = req.params.stock_name;
            const { from = "", to = "" } = req.query;
            const response = (await axios.get(`query?function=TIME_SERIES_MONTHLY&symbol=${stock_name}&apikey=${apiKey}`)).data;
            if (response === null) {
                return res.json('vazio')
            }
            const pricing = { 'name': stock_name, 'prices': [] }
            const initialDate = Date.parse(from).toString();
            const finalDate = Date.parse(to).toString();

            const arrayKeys = response ? Object.entries(response["Monthly Time Series"]) : []

            for (let i = 0; i < arrayKeys.length; i++) {
                let dateNow = Date.parse(arrayKeys[i][0])
                if (dateNow >= finalDate && dateNow <= initialDate) {
                    let price = {
                        pricedAt: arrayKeys[i][0],
                        opening: arrayKeys[i][1]['1. open'],
                        high: arrayKeys[i][1]['2. high'],
                        low: arrayKeys[i][1]['3. low'],
                        closing: arrayKeys[i][1]['4. close']
                    }
                    pricing['prices'].push(price);
                }
            }
            return res.status(200)
                .json(pricing);

        } catch (err) {
            console.log('Nodejs:', err);
        }
    },


    //Compare Stocks
    async getCompareStocks(req, res) {
        try {
            const stock_name = req.params.stock_name;
            const { stocks } = req.body;
            const result = [];

            for (stock of stocks) {
                const response = (await axios.get(`query?function=GLOBAL_QUOTE&symbol=${stock}&apikey=${apiKey}`)).data;
                const letprices = {
                    name: stock,
                    lastPrice: response['Global Quote']['05. price'],
                    pricedAt: response['Global Quote']['07. latest trading day']
                }
                result.push(letprices)
            }
            console.log('result', result);
            return res.json(result);

        } catch (err) {
            console.log('Error:', err)
        }

    },


    //Gains
    async getGainProjection(req, res) {
        try {
            const stock_name = req.params.stock_name;
            const { purchasedAmount = "", purchasedAt } = req.query;
            const data = (await axios.get(`query?function=TIME_SERIES_DAILY&symbol=${stock_name}&outputsize=full&apikey=${apiKey}`)).data["Time Series (Daily)"]

            const purchaseOn = data[purchasedAt];
            console.log(purchaseOn)


            const stockToday = data[Object.keys(data)[0]]
            const lastPrice = parseFloat(stockToday['4. close']).toFixed(2)
            const priceAtDate = parseFloat(purchaseOn['4. close']).toFixed(2)
            const gains = parseFloat((lastPrice - priceAtDate) * purchasedAmount).toFixed(3)

            const result = {
                name: stock_name,
                purchasedAmount,
                purchasedAt,
                priceAtDate,
                lastPrice,
                capitalGains: gains
            }
            return res.status(200)
                .json(result)
        } catch (err) {
            console.log('Error:', err)
        }
    }
}