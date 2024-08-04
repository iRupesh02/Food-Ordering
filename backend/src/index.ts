import express , {Request , Response} from "express";
import cors from 'cors';
import dotenv from "dotenv";
import connectDB from "./db";
import myUserRoute from './routes/myUser.routes'
import {v2 as cloudinary} from 'cloudinary'
import myRestaurantRoute from './routes/myRestaurant.routes'
import restaurantRoute from './routes/restaurant.routes'
dotenv.config({
  path : './.env'
})

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET

})

const app = express();
app.use(express.json())
app.use(cors())

app.get("/health" , async (req:Request , res: Response) => {
  res.send({message : "health ok!"})
})

app.use("/api/my/user" , myUserRoute)
app.use("/api/my/restaurant" , myRestaurantRoute);
app.use("/api/restaurant" , restaurantRoute)
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

