import {Request , Response } from 'express'
import Restaurant from '../models/restaurant.model';

const searchRestaurant = async (req : Request , res : Response) => {
 try {
    const city = req.params.city;
    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedCuisines = (req.query.selectedCuisines as string) || "";
    const sortOption = (req.query.sortOption as string) || "lastUpdated";
    const page = parseInt(req.query.page as string) || 1;
    
    let query : any = {};   
    //pattern match city
    query["city"] = new RegExp(city , "i") // london === Londom i denotes is case insensitive search
   const cityCheck = await Restaurant.countDocuments(query)
   if(cityCheck === 0 ){
    return res.status(404).json({data : [] , pagiantion : {
        total : 0,
        page : 1 ,
        pages : 1
    }});
   }
   if(selectedCuisines){
    //url = selectedcuisines = italien,burger,pizza
    // after split return array like [italien , burger ,pizza]
      const cuisinesArray = selectedCuisines.split(',').map((cuisine) => new RegExp(cuisine , "i"));
      query["cuisines"] = {$all : cuisinesArray}
   }
   if(searchQuery){
    // restaurantname = pizza palace
    // cuisines = [pizza , pasta , italian]
    // searchQuery = pasta
    const searchRegex = new RegExp(searchQuery , "i")
    query["$or"] = [{restaurantName : searchRegex},{cuisines : {$in : [searchRegex]}}]
   }

   const pageSize = 10;
   const skip = (page - 1) * pageSize;

   const restaurants = await Restaurant.find(query).sort({[sortOption] : 1}).skip(skip).limit(pageSize).lean()
   const total = await Restaurant.countDocuments(query)
   const response = {
    data : restaurants,
    pagination : {
        total,
        page,
        pages:Math.ceil(total/pageSize), // 50 results , pagesize = 10 >pages = 5
    }
   }

   res.json(response)

 } catch (error) {
    console.log("error in search restaurant controller" , error);
    res.status(500).json({message : "Something went wrong in search restaurant"})
}
}

export {searchRestaurant}