const api = require("../services/api");



async function getStockByName(req, res) {
    try {
        const { stock_name } = req.params;

        console.log(stock_name);
        if (!stock_name || stock_name == "") {
            return res.status(400).send("Nome da ação inválido");
        }

        const { data } = await api.get(
            `/query?function=GLOBAL_QUOTE&symbol=${stock_name}`
        );

        if (!data || Object.values(data["Global Quote"]).length === 0) {
            return res.status(400).send("Ação não encontrada");
        }

        const stock = {
            name: stock_name,
            lastPrice: parseFloat(data["Global Quote"]["05. price"]),
            pricedAt: data["Global Quote"]["07. latest trading day"],
        };

        return res.status(200).send(stock);
    } catch (error) {
        return res.status(400).send({ erro: error.toString() });
    }
}

async function getHistoryStock(req, res) {
    try {
        const { stock_name } = req.params;
        const { to, from } = req.query;

        if (!stock_name) {
            return res.status(400).send("Nome da ação inválida");
        }

        if (!to || !from) {
            return res.status(400).send("Data inválida");
        }

        const toSplit = to.split("-");
        const fromSplit = from.split("-");

        if (
            toSplit.length !== 3 ||
            toSplit["0"].length !== 4 ||
            toSplit["1"].length !== 2 ||
            toSplit["2"].length !== 2
        ) {
            return res
                .status(400)
                .send("Insira o formato de data válido: YYYY-MM-DD");
        }

        if (
            fromSplit.length !== 3 ||
            fromSplit["0"].length !== 4 ||
            fromSplit["1"].length !== 2 ||
            fromSplit["2"].length !== 2
        ) {
            return res
                .status(400)
                .send("Insira o formato de data válido: YYYY-MM-DD");
        }

        if (new Date(from) > new Date(to)) {
            return res
                .status(400)
                .send("A data final não pode ser menor que a inicial!");
        }

        const { data } = await api.get(
            `/query?function=TIME_SERIES_DAILY&symbol=${stock_name}&outputsize=full`
        );

        if (!data) {
            return res.status(404).send("Ação não encontrada");
        }

        const Keys = Object.keys(data["Time Series (Daily)"]);

        const StockHistory = {
            name: stock_name,
            prices: [],
        };

        let last = "";
        let first = Keys.indexOf(from) === -1 ? 0 : Keys.indexOf(from);

        for (let i = first; last !== to && i !== 0; i--) {
            if (data["Time Series (Daily)"][Keys[i]]) {
                StockHistory.prices.push({
                    opening: parseFloat(data["Time Series (Daily)"][Keys[i]]["1. open"]),
                    low: parseFloat(data["Time Series (Daily)"][Keys[i]]["3. low"]),
                    high: parseFloat(data["Time Series (Daily)"][Keys[i]]["2. high"]),
                    closing: parseFloat(data["Time Series (Daily)"][Keys[i]]["4. close"]),
                    pricedAt: Keys[i],
                });
                last = Keys[i];
            }
        }

        return res.status(200).send(StockHistory);
    } catch (error) {
        return res.status(400).send({ erro: error.toString() });
    }
}

module.exports = { getStockByName, getHistoryStock };