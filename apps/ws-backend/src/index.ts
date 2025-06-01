import { config } from "dotenv";
config();
import { JwtPayload, verify } from "jsonwebtoken";
import { WebSocket, WebSocketServer } from "ws";
import { usersProps } from "@repo/types/types";
import { Redis } from "@repo/redis/db";

const users: usersProps[] = [];

function checkUserAuth(token: string): string | null {
  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as JwtPayload;
    if (!decoded.userId) {
      return null;
    }
    return decoded.userId;
  } catch (error) {
    console.log(error);
    return null;
  }
}

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws: WebSocket, req: Request) => {
  const url = req.url;

  if (!url) {
    return;
  }

  const queryParam = new URLSearchParams(url.split("?")[1]);
  const token = queryParam.get("token");

  if (!token) {
    return;
  }

  const userId = checkUserAuth(token);

  if (!userId) {
    return;
  }

  ws.on("message", async (e) => {
    const parsedMessage = JSON.parse(e.toString());
    if (parsedMessage.type === "join_room") {
      console.log(parsedMessage);
      const { roomSlug } = parsedMessage.payload;
      users.push({
        ws,
        userId,
        roomSlug,
      });
      await Redis.subscribeAndSend(ws, roomSlug, users);
    }

    if (parsedMessage.type === "leave_room") {
      const { roomSlug } = parsedMessage.payload;
      const userIndex = users.findIndex((user) => user.ws === ws);
      const user = users[userIndex];

      if (user) {
        if (user.subscribedRoom?.has(roomSlug)) {
          user.subscribedRoom.delete(roomSlug);
          users.splice(userIndex, 1);
        }
      }

      const isRoomNeeded = users.some((u) => u.subscribedRoom?.has(roomSlug));

      if (!isRoomNeeded) {
        await Redis.unSubscribe(roomSlug);
      }
    }

    if (parsedMessage.type === "shapes") {
      const { roomSlug, message } = parsedMessage.payload;
      await Redis.putShapesInQueue(
        roomSlug,
        message,
        userId,
        parsedMessage.type
      );
    }

    if (parsedMessage.type === "delete_shape") {
      const { roomSlug, message } = parsedMessage.payload;
      await Redis.putShapesInQueue(
        roomSlug,
        message,
        userId,
        parsedMessage.type
      );
    }

    if (parsedMessage.type === "update_shape") {
      const { roomSlug, message } = parsedMessage.payload;
      await Redis.putShapesInQueue(
        roomSlug,
        message,
        userId,
        parsedMessage.type
      );
    }
  });

  ws.on("close", () => {
    const index = users.findIndex((user) => user.ws === ws);
    if (index !== -1) users.splice(index, 1);
  });
});
