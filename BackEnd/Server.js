import express from 'express'
import  dotenv from 'dotenv'
import userRoutes from './routes/userRoute.js'
dotenv.config();
import { notFound,erroHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
const port=process.env.PORT || 5000;


connectDB();




const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/users',userRoutes)

app.get('/',(req,res)=>res.send('server is ready'))

app.use(notFound);
app.use(erroHandler);

app.listen(port,()=>console.log(`server started on port  ${port}`))



