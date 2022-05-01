const api = require("../services/api");

async function getStocks(req, res) {
    try {
        const { stock_name } = req.params;

        if (!stock_name || stock_name == "") {
            return res.status(400).send("Nome da ação inválido");
        }

        const { data } = await api.get(
            `/query?function=GLOBAL_QUOTE&symbol=${stock_name}&apikey=${process.env.API_KEY}`
        );

        if (!data || Object.values(data["Global Quote"]).length === 0) {
            return res.status(404).send("Ação não encontrada");
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