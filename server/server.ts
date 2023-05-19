import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import routes from './routes'
import cors from 'cors'
import connection from './db/connection'

const app = express()

const PORT = process.env.APP_PORT

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

routes(app)

app.listen(PORT, () => {
  console.log(
    `\n[Express] Server running on port ${PORT}`,
    `\n[Express] Access to http://localhost:${PORT}.`
  )
})

const dbConnect = async () => {
  await connection.authenticate()
  console.log('[DATABASE CONNECTED]')
}

dbConnect()
