const app = require('./routes/index')


const port = process.env.PORT || 9000;
app.listen(port, function () {
    console.log(`Server started on port ${port}...`);
});

module.exports = app;