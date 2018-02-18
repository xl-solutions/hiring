const userController = require('../controllers/userController');
module.exports = (app) => {
	app.get('/stocks/:stock_name/quote', userController.quote);
	app.get('/stocks/:stock_name/history', userController.history);
	app.get('/stocks/:stock_name/gains', userController.gains);
	app.put('/stocks/:stock_name/compare', userController.compare);
};
