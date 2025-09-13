import express from 'express'
import dotenv from 'dotenv'
import cors from "cors"
import pool from './config/db.js'
import cookieParser from 'cookie-parser'

import userRouter from './routes/userRoutes.js'

dotenv.config({
  path: './env'
})

const app = express();
const port = process.env.PORT || 8000

console.log(process.env.PORT);


//Middlewares

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))

app.use(express.urlencoded({extended: true, limit: '20kb'}));
app.use(express.static('public'));

//Routes
app.use('/api', userRouter)

app.get('/', async(req,res) => {
  const result = await pool.query('SELECT * FROM users');
  res.json(result.rows);
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  
})