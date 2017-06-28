import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import compression from 'compression'
import stockRoute from './routes/stocks'

const app = express()

app.use(compression())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/stocks', stockRoute)

export default app
