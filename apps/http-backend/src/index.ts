import { config } from "dotenv";
config();
import express from "express";
import { v1Router } from "./v1/route";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

app.use("/api/v1", v1Router);

app.listen(5000);
