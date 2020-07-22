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




module.exports = app => app.use('/stocks', router)