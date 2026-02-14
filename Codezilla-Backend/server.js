const express= require ('express')
const connectDb = require('./config/db')
const dotenv = require('dotenv')
const userRoute = require('./Routes/userRoute')
const { notFound, errorHandler } = require('./Middlewares/errorMiddleware')
const postRoute = require ('./Routes/postRoute')
const cors = require ('cors')



const app =  express()

//connect DB
dotenv.config()
connectDb()


//middleware 
app.use(cors())
app.use(express.json())


//Error middlewares
// app.use(notFound)
app.use(errorHandler)



//Routes
app.use("/api/auth" , userRoute)
app.use("/api" , postRoute)

const PORT = process.env.PORT || 8000
app.listen( PORT , () => 
  console.log(`server is running on http://localhost:${PORT}`)
)