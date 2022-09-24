import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { connect } from "mongoose";
import orders from "./orders";
import products from "./products";
import sells from "./sells";
const app = express();

dotenv.config({
  path: ".env",
});

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connect(process.env.DATABASE_URL as string)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("error connecting to database", err);
  });

app.get("/", (req: Request, res: Response) => {
  return res.json({
    message: "api is working",
  });
});
app.use("/products", products);
app.use("/orders", orders);
app.use("/sells", sells);

const port = process.env.PORT || 2345;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
