import express , {Request , Response} from "express";
import cors from 'cors';
import dotenv from "dotenv";
import connectDB from "./db";
import myUserRoute from './routes/myUser.routes'

dotenv.config({
  path : './.env'
})

const app = express();
app.use(express.json())
app.use(cors())

app.use("/api/my/user" , myUserRoute)

connectDB()
.then( ()=>{
  app.on( "error" , (error)=>{
    console.log("error" , error);
    
  })
  app.listen(process.env.PORT || 8000, ()=>{
    console.log(`server is started at port ${process.env.PORT}`);
    
  })
})
.catch( (err) =>{
   console.log("Mongodb is connection failed " , err);
   })

