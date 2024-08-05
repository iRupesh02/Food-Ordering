import {Router} from 'express'
import { param } from 'express-validator';
import { getRestaurant, searchRestaurant } from '../controllers/searchRestaurant.controller';

const router = Router();

router.route('/search/:city').get(param("city").isString().trim().notEmpty().withMessage("City parameter must be a valid string") ,  searchRestaurant)

router.route('/:restaurantId').get(param("restaurantId").isString().trim().notEmpty().withMessage("RestaurantId parameter must be a valid string") ,  getRestaurant)

export default router