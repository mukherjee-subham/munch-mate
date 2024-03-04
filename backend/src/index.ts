import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_CONNECTION_URL as string).then(() => {
  console.log("Connected to DB");
});

app.use("/api/my/user", myUserRoute);

app.listen(3000, () => {
  console.log("Server is running!");
});
