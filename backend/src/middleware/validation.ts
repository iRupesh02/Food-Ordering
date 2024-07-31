import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const handleValidatorErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("Addressline1 must be string"),
  body("city").isString().notEmpty().withMessage("City must be a string"),
  body("country").isString().notEmpty().withMessage("Country must be a string"),
  handleValidatorErrors,
];


export const validateMyRestaurantRequest = [
  body("restaurantName").notEmpty().withMessage("Restaurant name is required"),
  body("city").notEmpty().withMessage("city name is required"),
  body("country").notEmpty().withMessage("country name is required"),
  body("deliveryPrice").isFloat({min:0}).withMessage("Delivery price must be a positive number"),
  body("estimatedDeliveryTime").isInt({min : 0}).withMessage("estimated delivery time must be a positive integer"),
  body("cuisines").isArray().withMessage("Cuisins must be an array ").not().isEmpty().withMessage("cuisins array cannot be empty"),
  body("menuItems").isArray().withMessage("menuItems must be an array"),
  body("meuItems.*.name").notEmpty().withMessage("menu item name is required"),
  body("menuItems.*.price").isFloat({min:0}).withMessage("menu item price is required and must be a positive number"),
  handleValidatorErrors,
  
]

