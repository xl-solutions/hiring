let
  bodyParser = require('body-parser'),
  consign = require('consign'),
  compression = require('compression'),
  dotenv = require('dotenv'),
  express = require('express'),
  helmet = require('helmet'),
  cors = require('cors'),
  path = require('path')

let app = express()

dotenv.config({path: path.join(__dirname,'../.env')})

app.use(helmet())
app.use(compression())
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

consign()
  .include('controllers')
  .then('routes')
  .into(app)

module.exports = app