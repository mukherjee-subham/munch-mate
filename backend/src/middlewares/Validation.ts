import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = async (
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

export const ValidateUserRequest = [
  body("name").isString().notEmpty().withMessage("Name should be a string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("AddressLine1 should be a string"),
  body("city").isString().notEmpty().withMessage("City should be a string"),
  body("country")
    .isString()
    .notEmpty()
    .withMessage("Country should be a string"),
  handleValidationErrors,
];

export const validateRestaurantRequest = [
  body("restaurantName").notEmpty().withMessage("Restaurant name is required"),
  body("city").notEmpty().withMessage("City is required"),
  body("country").notEmpty().withMessage("Country is required"),
  body("deliveryPrice")
    .isFloat({ min: 0 })
    .withMessage("Delivery price should be a positive number"),
  body("estimatedDeliveryTime")
    .isInt({ min: 0 })
    .withMessage("Estimated delivery time should be a positive integer"),
  body("cuisines")
    .isArray()
    .withMessage("Cuisines must be an array")
    .not()
    .isEmpty()
    .withMessage("Cuisines array cant be empty"),
  body("menuItems").isArray().withMessage("Menu Items must be an array"),
  body("menuItems.*.name")
    .notEmpty()
    .withMessage("Menu Items name is required"),
  body("menuItems.*.price")
    .isFloat({ min: 0 })
    .withMessage("Menu Items price must be a positive number"),
  handleValidationErrors,
];
