const stockService = require('./../services/stockService');

const quote = async(req, res) => {
    try {
        const stockQuote = await stockService.quote(req.params.stock_name);
        res.status(200).json(stockQuote);
    } catch (err) {
        res.status(400).json({ message: "Ha ocurrido un error, por favor intente de nuevo (" + err + ")", statushttp: 400 });
    }
};
const history = async(req, res) => {
    try {
        const stockHistory = await stockService.history(req.params.stock_name, req.query.from, req.query.to);
        res.status(200).json(stockHistory);
    } catch (err) {
        res.status(400).json({ message: "Ha ocurrido un error, por favor intente de nuevo (" + err + ")", statushttp: 400 });
    }
};
const compare = async(req, res) => {
    try {
        const stockCompare = await stockService.compare(req.params.stock_name);
        res.status(200).json(stockCompare);
    } catch (err) {
        res.status(400).json({ message: "Ha ocurrido un error, por favor intente de nuevo (" + err + ")", statushttp: 400 });
    }
};
const gains = async(req, res) => {
    try {
        const stockGains = await stockService.gains(req.params.stock_name, req.query.purchasedAmount, req.query.purchasedAt);
        res.status(200).json(stockGains);
    } catch (err) {
        res.status(400).json({ message: "Ha ocurrido un error, por favor intente de nuevo (" + err + ")", statushttp: 400 });
    }
};
const list = (req, res) => {
    const stocks = ["AAPL", "MSFT", "TSLA", "GOOGL", "AMZN", "FB", "TSM", "UNH", "JPM", "ABBV"];
    res.status(200).json({stocks}); 
};

const stockController = {quote, history, compare, gains, list};

module.exports = stockController;
