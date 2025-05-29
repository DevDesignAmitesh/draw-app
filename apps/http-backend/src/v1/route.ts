import { Request, Response, Router } from "express";
import { middleware } from "../middleware";
import { prisma } from "@repo/db/db";
import { hash, compare } from "bcryptjs";
import { SigninTypes, SignupTypes, CreateRoomTypes } from "@repo/types/types";
import { JwtPayload, sign } from "jsonwebtoken";
import { nanoid } from "nanoid";

export const v1Router: Router = Router();

v1Router.post("/signup", async (req: Request, res: Response): Promise<any> => {
  const result = SignupTypes.safeParse(req.body);

  if (!result.success && !result.data) {
    return res.status(404).json({ message: "invalid inputs" });
  }

  const hashedPassword = await hash(result.data.password, 5);

  try {
    await prisma.user.create({
      data: {
        ...result.data,
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .json({ message: "something went wrong while signup" })
      .status(404);
  }

  return res.status(201).json({ message: "user created" });
});

v1Router.post("/signin", async (req: Request, res: Response): Promise<any> => {
  const result = SigninTypes.safeParse(req.body);

  if (!result.success && !result.data) {
    return res.status(404).json({ message: "invalid inputs" });
  }

  const user = await prisma.user.findFirst({
    where: { email: result.data.email },
  });

  if (!user) {
    return res
      .json({ message: "user not found with the email " + result.data.email })
      .status(401);
  }

  const isPasswordRight = await compare(result.data.password, user.password);

  if (!isPasswordRight) {
    return res.status(401).json({ message: "wrong password" });
  }

  console.log(process.env.JWT_SECRET);
  console.log(user);

  if (!process.env.JWT_SECRET) {
    return res.status(201).json({ message: "jwt token not found" });
  }

  const token = sign({ userId: user.id }, process.env.JWT_SECRET);

  console.log(token);

  return res.status(201).json({ message: "successfull", token });
});

v1Router.post(
  "/create-room",
  middleware,
  async (req: Request, res: Response): Promise<any> => {
    const result = CreateRoomTypes.safeParse(req.body);
    const adminId = (req as JwtPayload).user.userId;

    if (!result.success && !result.data) {
      return res.status(404).json({ message: "invalid inputs" });
    }

    try {
      const slug = `${result.data.slug}-${nanoid(6)}`;
      const newRoom = await prisma.room.create({
        data: {
          slug,
          name: result.data.name,
          adminId,
        },
      });

      return res
        .json({ message: "room created", slug: newRoom.slug })
        .status(201);
    } catch (error) {
      console.log(error);
      return res
        .json({ message: "something went wrong while creating room" })
        .status(404);
    }
  }
);

v1Router.get(
  "/room",
  middleware,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const adminId = (req as JwtPayload).userId;
      const rooms = await prisma.room.findMany({
        where: {
          adminId,
        },
      });

      return res.status(201).json({ message: "rooms found", rooms });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "internal server error" });
    }
  }
);

v1Router.get(
  "/shapes/:slug",
  middleware,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const slug = req.params.slug;

      const chats = await prisma.room.findUnique({
        where: {
          slug,
        },
        include: {
          shapes: true,
        },
      });

      return res
        .json({ message: "chats found", shapes: chats?.shapes })
        .status(201);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "internal server error" });
    }
  }
);
