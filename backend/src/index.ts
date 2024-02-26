import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", (req: Request, res: Response) => {
  res.json({ message: "Healthy!" });
});

app.listen(3000, () => {
  console.log("Server is running!");
});
