import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import compression from 'compression'

const app = express()

app.use(compression())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

export default app
