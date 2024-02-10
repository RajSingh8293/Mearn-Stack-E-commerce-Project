import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDb from '../../backend/src/db/conn.js'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import userRouter from './routes/user.routes.js'
import categoryRouter from './routes/category.routes.js'
import productRouter from './routes/product.routes.js'
const app = express()
const port = 3000


dotenv.config({
	path: "./.env"
})

// const corsOptions = {
// 	origin: "http://localhost:5173",
// 	methods: ["GET", "PUT", "DELETE", "POST"],
// 	credentials: true
// }

// middleware
// app.use(cors(corsOptions))
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded(
	{ extended: true }
))



// routes 
app.use('/api/v1', userRouter)
app.use('/api/v1', categoryRouter)
app.use('/api/v1', productRouter)


app.get('/', (req, res) => {
	res.send('hello world')
})

connectDb().then(() =>
	app.listen(port, async (req, res) => {
		console.log("Server is running on port : ", port);
	})
).catch((error) =>
	console.log(error)
)