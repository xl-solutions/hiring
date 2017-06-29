import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import compression from 'compression'
import path from 'path'
import stockRoute from './routes/stocks'

const app = express()

app.use(compression())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(`${__dirname}/../frontend/dist`)))

app.use('/stocks', stockRoute)

export default app
