import { config } from "dotenv";
config();

export const JWT_SECRET = process.env.JWT_SECRET;
console.log(process.env.JWT_SECRET);
