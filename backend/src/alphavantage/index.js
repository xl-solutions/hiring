const axios = require('../client/client.js');
const apiDemo = "demo"
// process.env.API_KEY
require('dotenv').config();

module.exports = {

    //Returns the most recent quote for the stock [Atual Price]
    async getQuoteStock(req, res) {
        try {
            const stock_name = req.params.stock_name;
            const data = (await axios.get(`query?function=GLOBAL_QUOTE&symbol=${stock_name}&apikey=${apiDemo}`)).data;
            const response = {
                name: stock_name,
                lastPrice: data['Global Quote']['05. price'],
                pricedAT: data['Global Quote']['07. latest trading day']
            }
            return res.status(200)
                .json(response);
        } catch (err) {
            res.status(400)
        }
    },


    async getTimeSeriesStock(req, res) {
        try {
            const stock_name = req.params.stock_name;
            const { from = "", to = "" } = req.query;
            const response = (await axios.get(`query?function=TIME_SERIES_MONTHLY&symbol=${stock_name}&apikey=${apiDemo}`)).data;
            if (response === null) {
                return res.json('vazio')
            }
            const pricing = { 'name': stock_name, 'prices': [] }
            const initialDate = Date.parse(from).toString();
            const finalDate = Date.parse(to).toString();

            const arrayKeys = response ? Object.entries(response["Monthly Time Series"]) : []

            for (let i = 0; i < 6; i++) {
                let dateNow = Date.parse(arrayKeys[i][0])
                if (dateNow >= finalDate && dateNow <= initialDate ) {
                    let price = {
                        pricedAt: arrayKeys[i][0],
                        opening: arrayKeys[i][1]['1. open'],
                        high: arrayKeys[i][1]['2. high'],
                        low: arrayKeys[i][1]['3. low'],
                        closing: arrayKeys[i][1]['4. close']
                    }
                    pricing['prices'].push(price); F
                }
            }
            return res.status(200)
                .json(pricing);

        } catch (err) {
            console.log('Nodejs:', err);
        }
    },


    //Json payload with stock list
    async getCompareStocks(req, res) {
        try {
            const stock_name = req.params.stock_name;
            const body = req.body;
            console.log("Atributos", body['attributes'][2])
            return res.json(body);

        } catch (err) {
            console.log('Error:', err)
        }

    }


    //Stock History


}