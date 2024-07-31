import {Router} from 'express'
import multer from 'multer';
import {createMyRestaurant, getMyRestaurant, updateMyRestaurant} from '../controllers/myRestaurant.controller'
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from '../middleware/validation';
const router = Router();


const storage = multer.memoryStorage();
const upload = multer({storage : storage,
    limits: {
        fileSize:5*1024*1024 //5mb
    }
});
//api/my/resturant
router.route('/').post( upload.single('imageFile'),validateMyRestaurantRequest ,jwtCheck , jwtParse,createMyRestaurant)
router.route('/').get(jwtCheck , jwtParse , getMyRestaurant)
router.route('/').put(upload.single('imageFile'),validateMyRestaurantRequest ,jwtCheck , jwtParse,updateMyRestaurant)

export default router 