import { Request, Response } from "express";
import User from "../models/user.model";

const createCurrentUser = async (req: Request, res: Response) => {
  //1 check if the user exits
  //  2. create the user if it not exit
  // 3. return the user oject to the calling client
  try {
    const { auth0Id } = req.body;
    const existUser = await User.findOne({ auth0Id });
    if (existUser) {
      return res.status(200).send("Already user exist");
    }

    const newUser = new User(req.body);
    await newUser.save();

    if (newUser) {
      res.status(201).json(newUser.toObject());
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error creating user" });
  }
};

const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, phone, addressLine1, country, city } = req.body;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.phone = phone;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;
    await user.save();

    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error updating user" });
  }
};

const getCurrentUser = async (req : Request , res: Response) =>{
          try {
            const currentUser = await User.findOne({_id : req.userId})
            if(!currentUser){
              return res.status(404).json({message : "User not found"});
            }
            res.json(currentUser);
          } catch (error) {
            console.log(error);
            return res.status(500).json({message : "Something went wrong"})
          }
}

export { createCurrentUser, updateCurrentUser , getCurrentUser};
