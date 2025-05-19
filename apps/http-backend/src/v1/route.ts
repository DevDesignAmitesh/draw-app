import { Request, Response, Router } from "express";
import { middleware } from "../middleware";

export const v1Router: Router = Router();

v1Router.post("/signup", (req: Request, res: Response) => {});

v1Router.post("/signin", (req: Request, res: Response) => {});

v1Router.post("/signout", (req: Request, res: Response) => {});

v1Router.post("/create-room", middleware, (req: Request, res: Response) => {});

v1Router.get("/room", middleware, (req: Request, res: Response) => {});

v1Router.get("/chats:roomId", middleware, (req: Request, res: Response) => {});
