import express from "express";
import "dotenv/config";
import cors from "cors";
import router from "./routes/routes";
import connectDB from "./databse/mongo_db";
import { Request, Response, NextFunction } from "express";                        

const app = express();

app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

app.options('/', cors());
app.use(express.json());

console.log("OpenAI model:", process.env.OPENAI_API_KEY);

if (connectDB()) {
  console.log("connected to mongoDB");
}

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hi from server",
  });
});

app.get("/test-youtube", async (req, res) => {
  try {
    const response = await fetch("https://www.youtube.com/watch?v=s2EYIDY8wSM");
    res.status(200).send({ status: response.status });
  } catch (err) {
    //@ts-ignore
    res.status(500).send({ error: err.message });
  }
});


app.use("/api/v1", router);

app.listen(8000, () => {
  console.log("server stated on port 8000");
});
