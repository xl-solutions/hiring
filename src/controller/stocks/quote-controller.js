const statusCodes = require('../../utils/statusCodes');
const { handleQuote } = require('../../services/stocks/quote-services');

module.exports = {
  async quote(req, res) {
    try {
      const latestPrice = await handleQuote(req.params);
      return res.status(statusCodes.OK).json(latestPrice);
    } catch (err) {
      return res.status(statusCodes.BAD_REQUEST).json(err);
    }
  },
};
