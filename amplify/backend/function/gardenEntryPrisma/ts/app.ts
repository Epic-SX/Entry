import * as express from 'express'
import testRouter from './routes/tests'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin","*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

app.use('/tests',testRouter)

export default app
