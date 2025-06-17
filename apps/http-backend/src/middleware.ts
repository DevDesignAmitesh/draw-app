import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

export function middleware(
  req: Request,
  res: Response,
  next: NextFunction
): any {
  const token = req.cookies.token;
  console.log("token in the backend route", token);
  console.log("token in the backend route", req.cookies);

  if (!token) {
    return res.status(400).json({ message: "token not provided" });
  }

  console.log(token);

  try {
    let decoded = verify(token, process.env.JWT_SECRET!);

    console.log(token);
    (req as JwtPayload).user = decoded;
    next();
  } catch (error) {
    console.error("JWT verify error:", error);
    return res.status(403).json({ message: "Invalid token" });
  }
}
