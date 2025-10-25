import express from "express";
import "dotenv/config";
import cors from "cors";
import router from "./routes/routes";
import connectDB from "./databse/mongo_db";
import { Request, Response, NextFunction } from "express";                        


const app = express();

app.use(express.json());
app.use(cors({
  origin: ["https://trans-yobe.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

if (connectDB()) {
  console.log("connected to mongoDB");
}

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hi from server",
  });
});

app.use("/api/v1", router);

app.listen(8000, () => {
  console.log("server stated on port 8000");
});
