const app = require('./config/app')();
app.listen(app.get('port'), () => {
	console.log(app.get('port'));
});
module.exports = app;