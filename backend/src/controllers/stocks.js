const api = require("../services/api");
const {get, add } = require("../database/myStocks");

async function addStockAtPortfolio(req, res) {
    try {
        const stock = req.body;
        if (!stock.name || !stock.lastPrice || !stock.pricedAt) {
            return res.status(400).send({ message: "Ação inválida" });
        }
        await add(stock);
        return res.status(200).send({ message: "Ação incluida" });
    } catch (error) {
        return res.status(400).send({ erro: error.toString() });
    }
}

async function getStockAtPortfolio(req, res) {
    try {
        const stocks = await get();
        return res.status(200).send(stocks);
    } catch (error) {
        return res.status(400).send({ erro: error.toString() });
    }
}

async function getStockByName(req, res) {
    try {
        const { stock_name } = req.params;

        if (!stock_name || stock_name == "") {
            return res.status(400).send({ message: "Nome da ação inválido" });
        }

        const { data } = await api.get(
            `/query?function=GLOBAL_QUOTE&symbol=${stock_name}`
        );

        if (!data || Object.values(data["Global Quote"]).length === 0) {
            return res.status(400).send({ message: "Ação não encontrada" });
        }
        const date = new Date(data["Global Quote"]["07. latest trading day"])

        const stock = {

            name: stock_name,
            lastPrice: parseFloat(data["Global Quote"]["05. price"]),
            pricedAt: date
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
            return res.status(400).send({ message: "Nome da ação inválida" });
        }

        if (!to || !from) {
            return res.status(400).send({ message: "Data inválida" });
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
                .send({ message: "Insira o formato de data válido: YYYY-MM-DD" });
        }

        if (
            fromSplit.length !== 3 ||
            fromSplit["0"].length !== 4 ||
            fromSplit["1"].length !== 2 ||
            fromSplit["2"].length !== 2
        ) {
            return res
                .status(400)
                .send({ message: "Insira o formato de data válido: YYYY-MM-DD" });
        }

        if (new Date(from) > new Date(to)) {
            return res
                .status(400)
                .send({ message: "A data final não pode ser menor que a inicial!" });
        }

        const { data } = await api.get(
            `/query?function=TIME_SERIES_DAILY&symbol=${stock_name}&outputsize=full`
        );

        if (!data) {
            return res.status(404).send({ message: "Ação não encontrada" });
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

async function stocksComparation(req, res) {
    try {
        const { stock_name } = req.params;
        const { stocksList } = req.body
        let lastPrices = [];

        if (!stock_name || !stocksList) {
            return res.status(400).send({ message: "Nome da ação inválida" });
        }

        if (stock_name === "" || stocksList.length == 0) {
            return res
                .status(400)
                .send({ message: "Inclua pelo menos uma ação para comparação" });
        }

        let stocksCompare = [];
        stocksCompare.push(stock_name, stocksList);

        for (stock in stocksCompare) {
            const { data } = await api.get(
                `/query?function=GLOBAL_QUOTE&symbol=${stock_name}`
            );

            if (!data) {
                return res.status(400).send({ message: "Ação não encontrada" });
            }

            // if (Object.keys(data["Global Quote"]).length === 0) {
            //     return res.status(400).send({ message: "Ação não encontrada" });
            // }

            lastPrices.push({
                name: stocksCompare[stock],
                lastPrice: parseFloat(data["Global Quote"]["05. price"]),
                pricedAt: data["Global Quote"]["07. latest trading day"],
            });
        }
        return res.status(200).send(lastPrices);
    } catch (error) {
        return res.status(400).send({ erro: error.toString() });
    }
}

async function getProjectionStock(req, res) {
    try {
        let { purchasedAt, purchasedAmount } = req.query;
        const { stock_name } = req.params;

        purchasedAmount = parseInt(purchasedAmount);

        if (!stock_name || !purchasedAt || !purchasedAmount) {
            return res
                .status(400)
                .send({ message: "Inclua todos os dados requeridos" });
        }

        if (purchasedAmount <= 0) {
            return res.status(400).send({ message: "Quantidade comprada inválida" });
        }

        const purchasedAtSplit = purchasedAt.split("-");

        if (
            purchasedAtSplit.length !== 3 ||
            purchasedAtSplit["0"].length !== 4 ||
            purchasedAtSplit["1"].length !== 2 ||
            purchasedAtSplit["2"].length !== 2
        ) {
            return res.status(400).send({
                message: "Formato da data inválida! Insira o formato: YYYY--MM--DD",
            });
        }

        const { data } = await api.get(
            `/query?function=TIME_SERIES_DAILY&symbol=${stock_name}&outputsize=full`
        );

        if (!data) {
            return res.status(400).send({ message: "Ação não encontrada" });
        }

        const stockPrices = data["Time Series (Daily)"];

        if (stockPrices[purchasedAt] === undefined) {
            return res.status(400).send({ message: "Data de compra não encontrada" });
        }

        const purchased = stockPrices[purchasedAt];
        let now = stockPrices[Object.keys(stockPrices)[0]];
        let pricePurchased = parseFloat(purchased["4. close"]);
        let currentPrice = parseFloat(now["4. close"]);

        const gainsResponse = {
            name: stock_name,
            purchasedAmount,
            purchasedAt,
            pricePurchased,
            currentPrice,
            gains: parseFloat(
                (currentPrice - pricePurchased) * purchasedAmount
            ).toFixed(2),
        };

        return res.status(200).send(gainsResponse);
    } catch (error) {
        return res.status(400).send({ erro: error.toString() });
    }
}

module.exports = {
    getStockByName,
    getHistoryStock,
    stocksComparation,
    getProjectionStock,
    addStockAtPortfolio,
    getStockAtPortfolio,
};