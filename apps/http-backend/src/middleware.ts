import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

export function middleware(
  req: Request,
  res: Response,
  next: NextFunction
): any {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ message: "token not provided" }).status(405);
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
