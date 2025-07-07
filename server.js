import express from "express"
import cors from 'cors'
import 'dotenv/config'
import songRouter from "./src/routes/songRoutes.js"
import albumRouter from './src/routes/albumRoutes.js'
import connectDB from "./src/config/mongodb.js"
import connectCloudinary from "./src/config/cloudinary.js"

const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/song',songRouter)
app.use('/api/album',albumRouter)

app.get('/', (req,res)=> res.send("API Working"))

app.listen(port, ()=>console.log(`server started on ${port}`))