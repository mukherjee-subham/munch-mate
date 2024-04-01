import express from "express";
import { jwtCheck, jwtParse } from "../middlewares/Auth";
import OrderController from "../controllers/OrderController";

const router = express.Router();

router.post(
  "/checkout/create-checkout-session",
  jwtCheck,
  jwtParse,
  OrderController.createCheckoutSession
);

export default router;
