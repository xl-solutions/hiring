let app = require('./config/server')

const port = process.env.APP_PORT

app.listen(port, () => {
  console.log('Server listening on port ' + port + '!')
})