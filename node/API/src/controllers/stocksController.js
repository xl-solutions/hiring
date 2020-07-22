const express = require('express')
const router = express.Router();
const api = require("../services/AlphaApi")




router.get("/:stock_name/quote", async (req, res) => {

    try {
        const { stock_name } = req.params

        if (!stock_name || stock_name === "")
            return res.status(400).send({ erro: "O nome da ação é invalido" })


        //Faz a chamada na api da alpha
        const data = (await api.get(`/query?function=GLOBAL_QUOTE&symbol=${stock_name}`)).data


        //A api da alpha as vezes manda respostas diferentes para açoes que nao existem, por  isso, fiz 3 verificaçoes
        if (!data)
            return res.status(404).send({ erro: `Ação ${stock} não encontrada` })

        if (data.Note)
            return res.status(404).send({ erro: `Limite de Busca na API alphavantage por minuto atingido` })

        if (Object.values(data['Global Quote']).length === 0)
            return res.status(404).send({ erro: "Ação não encontrada" })
        //------------------------------------------------------------------------------------------------------------


        const response = {
            name: stock_name,
            lastPrice: parseFloat(data['Global Quote']["05. price"]),
            pricedAt: data['Global Quote']["07. latest trading day"] // data e hora no formato ISO 8601, UTC
        }

        return res.send(response)

    } catch (err) {
        console.log(err)
        return res.status(400).send({ erro: err.toString() })
    }
})




router.get('/:stock_name/history', async (req, res) => {

    try {
        const { from, to } = req.query
        const { stock_name } = req.params

        if (!stock_name || stock_name === "" || !from || from === '' || !to || to === '')
            return res.status(400).send({ erro: "Argumentos invalidos" })


        //Verificando formato das datas
        const fromSplit = from.split('-')
        if (fromSplit.length != 3 || fromSplit[0].length != 4 || fromSplit[1].length != 2 || fromSplit[2].length != 2)
            return res.status(400).send({ erro: "Data inicial com formato invalido. Esperado: yyyy-mm-dd" })

        const toSplit = to.split('-')
        if (toSplit.length != 3 || toSplit[0].length != 4 || toSplit[1].length != 2 || toSplit[2].length != 2)
            return res.status(400).send({ erro: "Data final com formato invalido. Esperado: yyyy-mm-dd" })
        //------------------------------





        if (new Date(from) > new Date(to))
            return res.status(400).send({ erro: "Data inicial deve ser menor que a final." })

        const data = (await api.get(`/query?function=TIME_SERIES_DAILY&symbol=${stock_name}&outputsize=full`)).data['Time Series (Daily)']

        if (!data)
            return res.status(404).send({ erro: "Ação não encontrada ou atingiu o limite de Busca na API alphavantage por minuto atingido" })

        if (data.Note)
            return res.status(404).send({ erro: `Limite de Busca na API alphavantage por minuto atingido` })

        const keys = Object.keys(data)

        var response = {
            name: stock_name,
            prices: []
        }

        var last = ''

        //caso a data seja superior a ultima listada na api, ele pega a ultima;
        var first = keys.indexOf(from) == -1 ? 0 : keys.indexOf(from)

        for (i = first; last != to && i != 0; i--) {

            response.prices.push({
                opening: parseFloat(data[keys[i]]['1. open']),
                low: parseFloat(data[keys[i]]['3. low']),
                high: parseFloat(data[keys[i]]['2. high']),
                closing: parseFloat(data[keys[i]]['4. close']),
                pricedAt: keys[i],
            })
            last = keys[i]
        }
        return res.send(response)

    } catch (err) {
        console.log(err)
        return res.status(400).send({ erro: err.toString() })
    }



})


router.get('/:stock_name/compare', async (req, res) => {

    try {

        const { stock_name } = req.params
        const { stocks } = req.body
        var lastPrices = []

        if (!stock_name || stock_name === "" || !stocks || stocks.length == 0)
            return res.status(400).send({ erro: "Argumentos invalidos" })




        stocks.push(stock_name)


        for (stock of stocks) {


            if (stock == "")
                return res.status(404).send({ erro: `Nome de açao invalido` })

            var data = (await api.get(`/query?function=GLOBAL_QUOTE&symbol=${stock}`)).data

            if (!data)
                return res.status(404).send({ erro: `Ação ${stock} não encontrada` })

            if (data.Note)
                return res.status(404).send({ erro: `Limite de Busca na API alphavantage por minuto atingido` })


            if (Object.values(data['Global Quote']).length === 0)
                return res.status(404).send({ erro: `Ação ${stock} não encontrada` })


            lastPrices.push({
                name: stock,
                lastPrice: parseFloat(data['Global Quote']["05. price"]),
                pricedAt: data['Global Quote']["07. latest trading day"] // data e hora no formato ISO 8601, UTC
            })
        }
        return res.send(lastPrices)

    } catch (err) {
        console.log(err)
        return res.status(400).send({ erro: err.toString() })
    }



})







module.exports = app => app.use('/stocks', router)