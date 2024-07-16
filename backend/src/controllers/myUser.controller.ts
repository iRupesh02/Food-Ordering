import {Request , Response} from 'express'
import User from '../models/user.model';

const createCurrentUser = async (req:Request , res:Response)=>{
     //1 check if the user exits
    //  2. create the user if it not exit
    // 3. return the user oject to the calling client
    try {
        const {auth0Id} = req.body;
        const existUser = await User.findOne({auth0Id});
        if(existUser){
            return res.status(200).send("Already user exist")
        }

        const newUser = new User(req.body)
         await newUser.save();

         if(newUser){
             res.status(201).json(newUser.toObject());
         }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error creating user"});
        
    }
}

export {createCurrentUser};