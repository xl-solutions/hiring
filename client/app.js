let
  compression = require('compression'),
  express = require('express'),
  helmet = require('helmet'),
  path = require('path')

let app = express()

const port = 8000

app.use(helmet())
app.use(compression())

app.use(express.static(path.join(__dirname, 'dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'dist/index.html'))
})

app.listen(port, () => {
  console.log('Client listening on port ' + port + '!')
})