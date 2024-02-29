import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_CONNECTION_URL as string).then(() => {
  console.log("Connected to DB");
});

app.get("/health", (req: Request, res: Response) => {
  res.json({ message: "Healthy!" });
});

app.listen(3000, () => {
  console.log("Server is running!");
});
