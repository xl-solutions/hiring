const statusCodes = require('../../utils/statusCodes');
const { handleHistory } = require('../../services/stocks/history-services');

module.exports = {
  async history(req, res) {
    try {
      const historyPrice = await handleHistory(req.params);
      return res.status(statusCodes.OK).json(historyPrice);
    } catch (err) {
      return res.status(statusCodes.BAD_REQUEST).json(err);
    }
  },
};
