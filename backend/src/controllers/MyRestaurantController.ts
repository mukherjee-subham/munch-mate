import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
import { ReadonlyContext } from "express-validator/src/context";

const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });

    if (existingRestaurant) {
      return res.status(409).json("Restaurant already exists");
    }

    const uploadResponse = await uploadImage(req.file as Express.Multer.File);

    const restaurant = new Restaurant(req.body);
    restaurant.imageUrl = uploadResponse.url;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    restaurant.lastUpdated = new Date();

    await restaurant.save();

    return res.status(201).json(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

const getMyRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });

    if (!restaurant) {
      console.log("No restaurant found");
      return res.status(404).json({ message: "Restaurant listing not found" });
    }

    return res.send(restaurant);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const updateMyRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });

    if (!existingRestaurant) {
      console.log("No restaurant found for update");
      return res.status(404).json({ message: "Restaurant details not found" });
    }

    if (req.file) {
      const uploadResponse = await uploadImage(req.file);
      existingRestaurant.imageUrl = uploadResponse.url;
    }

    existingRestaurant.restaurantName = req.body.restaurantName;
    existingRestaurant.city = req.body.city;
    existingRestaurant.country = req.body.country;
    existingRestaurant.deliveryPrice = req.body.deliveryPrice;
    existingRestaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    existingRestaurant.menuItems = req.body.menuItems;
    existingRestaurant.cuisines = req.body.cuisines;
    existingRestaurant.lastUpdated = new Date();

    await existingRestaurant.save();

    return res
      .status(200)
      .json({ message: "Restaurant details updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

const uploadImage = async (file: Express.Multer.File) => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;

  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
  return uploadResponse;
};

export default {
  createMyRestaurant,
  getMyRestaurant,
  updateMyRestaurant,
};
