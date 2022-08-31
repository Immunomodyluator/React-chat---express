import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import router from './router/index.js'
import * as dotenv from 'dotenv'
import errorMiddleware from './middleware/error-middleware.js'
dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', router)
//Middleware с ошибками должен всегда идти последним
app.use(errorMiddleware)

async function start() {
  try {
    await mongoose.connect(`${process.env.MONGO_DB_URL}`, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    app.listen(PORT, () => console.log(`listening on: ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()
