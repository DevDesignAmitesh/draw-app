import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

export function middleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    res.json({ message: "token not provided" }).status(405);
  }

  const bearerToken = token?.split("Bearer ")[1];

  if (!bearerToken) {
    res.json({ message: "bearerToken not provided" }).status(405);
  }

  try {
    let decoded;
    if (bearerToken) {
      decoded = verify(bearerToken, process.env.JWT_SECRET!);
    }

    console.log(bearerToken);
    console.log(token);
    (req as JwtPayload).user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return;
  }
}
