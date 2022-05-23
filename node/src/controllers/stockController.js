const stockService = require('./../services/stockService');

const quote = async(req, res) => {
    try {
        const stockQuote = await stockService.quote(req.params.stock_name);
        res.status(200).json(stockQuote);
    } catch (err) {
        res.status(400).json({ message: "Ha ocurrido un error, por favor intente de nuevo (" + err + ")", statushttp: 400 });
    }
};
const history = (req, res) => {

};
const compare = (req, res) => {

};
const gains = (req, res) => {

};

const stockController = {quote, history, compare, gains};

module.exports = stockController;
