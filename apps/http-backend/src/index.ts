import express from "express";
import { v1Router } from "./v1/route";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", v1Router);

app.listen(5000);
