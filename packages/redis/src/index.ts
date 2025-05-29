import { RedisClientType, createClient } from "redis";
import { WebSocket } from "ws";
import { usersProps } from "@repo/types/types";

const subscribedRooms = new Set<string>();

export class Redis {
  private static instance: RedisClientType | null = null;
  private static readonly shapesQueueKey = "shapes:232392834ffierveru";

  public static async getInstance(): Promise<RedisClientType> {
    if (!Redis.instance) {
      Redis.instance = createClient();

      Redis.instance.on("error", (err) => {
        console.error("Redis Error:", err);
      });

      await Redis.instance.connect();
    }

    return Redis.instance;
  }

  public static async subscribeAndSend(
    ws: WebSocket,
    roomSlug: string,
    users: usersProps[]
  ) {
    try {
      const client = await Redis.getInstance();

      if (!subscribedRooms.has(roomSlug)) {
        subscribedRooms.add(roomSlug);
        await client.subscribe(`shapes:${roomSlug}`, (message) => {
          users.forEach((u) => {
            if (u.ws === ws && u.roomSlug === roomSlug) {
              u.ws.send(
                JSON.stringify({
                  type: "shapes",
                  message,
                })
              );
            }
          });
        });

        const userIndex = users.findIndex((u) => u.ws === ws);
        const user = users[userIndex];
        if (user) {
          if (!user.subscribedRoom?.has(roomSlug)) {
            user.subscribedRoom?.add(roomSlug);
          }
        }
      }
    } catch (error) {
      console.log("error is subscribeAndSend: " + error);
    }
  }

  public static async unSubscribe(roomSlug: string) {
    try {
      const client = await Redis.getInstance();
      await client.unsubscribe(`shapes:${roomSlug}`);
      subscribedRooms.delete(roomSlug);
    } catch (e) {
      console.log("error in unSubscribe: " + e);
    }
  }

  public static async putShapesInQueue(
    roomSlug: string,
    message: string,
    userId: string
  ) {
    try {
      const redis = await Redis.getInstance();
      await redis.lPush(
        Redis.shapesQueueKey,
        JSON.stringify({ roomSlug, message, userId })
      );
    } catch (e) {
      console.log("error in putShapesInQueue: " + e);
    }
  }

  public static async pickupShapesAndPutInDb(
    handler: (data: {
      roomSlug: string;
      message: string;
      userId: string;
    }) => Promise<void>
  ) {
    try {
      const client = await Redis.getInstance();

      while (true) {
        const result = await client.brPop(Redis.shapesQueueKey, 0);
        if (result) {
          const data = JSON.parse(result.element);

          await handler(data);

          await client.publish(`shapes:${data.roomSlug}`, JSON.stringify(data));
        }
      }
    } catch (e) {
      console.log("error in pickupShapesAndPutInDb: " + e);
    }
  }
}
