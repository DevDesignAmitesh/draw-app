import { JwtPayload, verify } from "jsonwebtoken";
import { WebSocket, WebSocketServer } from "ws";
import { prisma } from "@repo/db/db";
import { JWT_SECRET } from "@repo/envs/envs";

interface usersProps {
  ws: WebSocket;
  roomSlug: string | null;
  userId: string;
}

let users: usersProps[] = [];

function checkUserAuth(token: string): string | null {
  const decoded = verify(token, JWT_SECRET) as JwtPayload;
  if (!decoded.userId) {
    return null;
  }
  return decoded.userId;
}

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws: WebSocket, req: Request) => {
  const url = req.url;

  if (!url) {
    ws.close();
    return;
  }

  const queryParam = new URLSearchParams(url.split("?")[1]);
  const token = queryParam.get("token");

  if (!token) {
    return ws.close();
  }

  const userId = checkUserAuth(token);

  if (!userId) {
    ws.close();
    return;
  }

  ws.on("message", async (e) => {
    const parsedMessage = JSON.parse(e.toString());

    if (parsedMessage.type === "join_room") {
      users.push({
        ws,
        roomSlug: null,
        userId,
      });
    }

    if (parsedMessage.type === "leave_room") {
      users.filter((user) => user.ws !== ws);
    }

    if (parsedMessage.type === "chat") {
      const { payload } = parsedMessage;
      await prisma.chat.create({
        data: {
          message: payload.message,
          roomId: payload.roomSlug,
          userId,
        },
      });

      users.forEach((user) => {
        if (user.ws !== ws && user.roomSlug === payload.roomSlug) {
          user.ws.send(
            JSON.stringify({
              type: "chat",
              message: payload.message,
            })
          );
        }
      });
    }

    if (parsedMessage.type === "shapes") {
      const { payload } = parsedMessage;
      await prisma.shapes.create({
        data: {
          message: payload.message,
          roomId: payload.roomSlug,
          userId,
        },
      });

      users.forEach((user) => {
        if (user.ws !== ws && user.roomSlug === payload.roomSlug) {
          user.ws.send(
            JSON.stringify({
              type: "shapes",
              message: payload.message,
            })
          );
        }
      });
    }
  });

  ws.on("close", () => {
    users.filter((user) => user.ws !== ws);
  });

  ws.on("error", (e) => console.log(e));
});
