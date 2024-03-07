import express from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck, jwtParse } from "../middlewares/Auth";
import { ValidateUserRequest } from "../middlewares/Validation";

const router = express.Router();

router.post("/", jwtCheck, MyUserController.createCurrentUser);
router.put(
  "/",
  jwtCheck,
  jwtParse,
  ValidateUserRequest,
  MyUserController.updateCurrentUser
);

export default router;
