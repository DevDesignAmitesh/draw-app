import { Request, Response, Router } from "express";
import { middleware } from "../middleware";
import { prisma } from "@repo/db/db";
import { hash, compare } from "bcryptjs";
import { SigninTypes, SignupTypes, CreateRoomTypes } from "@repo/types/types";
import { JwtPayload, sign } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/envs/envs";
import { nanoid } from "nanoid";

export const v1Router: Router = Router();

v1Router.post("/signup", async (req: Request, res: Response): Promise<any> => {
  const result = SignupTypes.safeParse(req.body);

  if (!result.success && !result.data) {
    return res.json({ message: "invalid inputs" }).status(404);
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

  return res.json({ message: "user created" }).status(201);
});

v1Router.post("/signin", async (req: Request, res: Response): Promise<any> => {
  const result = SigninTypes.safeParse(req.body);

  if (!result.success && !result.data) {
    return res.json({ message: "invalid inputs" }).status(404);
  }

  const user = await prisma.user.findFirst({
    where: { email: result.data.email },
  });

  if (!user) {
    return res
      .json({ message: "user not found with the email" + result.data.email })
      .status(401);
  }

  const isPasswordRight = await compare(result.data.password, user.password);

  if (!isPasswordRight) {
    return res.json({ message: "wrong password" }).status(401);
  }

  const token = sign({ userId: user.id }, JWT_SECRET);

  return res.json({ message: "successfull", token }).status(201);
});

v1Router.post(
  "/create-room",
  middleware,
  async (req: Request, res: Response): Promise<any> => {
    const result = CreateRoomTypes.safeParse(req.body);
    const adminId = (req as JwtPayload).user.userId;

    if (!result.success && !result.data) {
      return res.json({ message: "invalid inputs" }).status(404);
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

      return res.json({ message: "rooms found", rooms }).status(201);
    } catch (error) {
      console.log(error);
      return res.json({ message: "internal server error" }).status(500);
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
      return res.json({ message: "internal server error" }).status(500);
    }
  }
);
