import { config } from "dotenv";
config();
import { RedisClientType, createClient } from "redis";
import { WebSocket } from "ws";
import { usersProps } from "@repo/types/types";

const subscribedRooms = new Set<string>();

const redisCredentials = {
  url: process.env.REDIS_URL!,
};

export class Redis {
  private static commandClient: RedisClientType | null = null;
  private static subscriberClient: RedisClientType | null = null;
  private static readonly shapesQueueKey = "shapes:232392834ffierveru";

  public static async getCommandClient(): Promise<RedisClientType> {
    if (!Redis.commandClient) {
      // Redis.commandClient = createClient(redisCredentials);
      Redis.commandClient = createClient({url: "redis://redis:6379"});

      Redis.commandClient.on("error", (err) => {
        console.error("Redis Error:", err);
      });

      await Redis.commandClient.connect();
    }

    return Redis.commandClient;
  }

  public static async getSubscriberClient(): Promise<RedisClientType> {
    if (!Redis.subscriberClient) {
      // Redis.subscriberClient = createClient(redisCredentials);
      Redis.subscriberClient = createClient({url: "redis://redis:6379"});

      Redis.subscriberClient.on("error", (err) => {
        console.error("Redis Error:", err);
      });

      await Redis.subscriberClient.connect();
    }

    return Redis.subscriberClient;
  }

  public static async subscribeAndSend(
    ws: WebSocket,
    roomSlug: string,
    users: usersProps[]
  ) {
    try {
      const client = await Redis.getSubscriberClient();
      if (!subscribedRooms.has(roomSlug)) {
        subscribedRooms.add(roomSlug);
        await client.subscribe(`shapes:${roomSlug}`, (data: any) => {
          const parsedMessage: any = JSON.parse(data);
          users
            .filter(
              (u) =>
                u.userId !== parsedMessage.userId && u.roomSlug === roomSlug
            )
            .forEach((u) => {
              if (parsedMessage.type === "shapes") {
                u.ws.send(
                  JSON.stringify({
                    type: "shapes",
                    message: parsedMessage.message,
                    userId: u.userId,
                  })
                );
              }
              if (parsedMessage.type === "delete_shape") {
                u.ws.send(
                  JSON.stringify({
                    type: "delete_shape",
                    message: parsedMessage.message,
                    userId: u.userId,
                  })
                );
              }
              if (parsedMessage.type === "update_shape") {
                u.ws.send(
                  JSON.stringify({
                    type: "update_shape",
                    message: parsedMessage.message,
                    userId: u.userId,
                  })
                );
              }
              if (parsedMessage.type === "send_cursor") {
                u.ws.send(
                  JSON.stringify({
                    type: "send_cursor",
                    userId: parsedMessage.userId,
                    x: parsedMessage.x,
                    y: parsedMessage.y,
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
      const client = await Redis.getSubscriberClient();
      await client.unsubscribe(`shapes:${roomSlug}`);
      subscribedRooms.delete(roomSlug);
    } catch (e) {
      console.log("error in unSubscribe: " + e);
    }
  }

  public static async putShapesInQueue(
    roomSlug: string,
    message: string,
    userId: string,
    type: string
  ) {
    try {
      const redis = await Redis.getCommandClient();
      await redis.lPush(
        Redis.shapesQueueKey,
        JSON.stringify({ roomSlug, message, userId, type })
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
      type: string;
    }) => Promise<void>
  ) {
    try {
      const client = await Redis.getCommandClient();
      while (true) {
        const result = await client.brPop(Redis.shapesQueueKey, 0);
        if (result) {
          const data = JSON.parse(result.element);

          await handler(data);
          await client.publish(
            `shapes:${data.roomSlug}`,
            JSON.stringify({
              message: data.message,
              type: data.type,
              userId: data.userId,
            })
          );
        }
      }
    } catch (e) {
      console.log("error in pickupShapesAndPutInDb: " + e);
    }
  }

  public static async publishJoinMessage(
    roomSlug: string,
    userId: string,
    type: string,
    x: number,
    y: number
  ) {
    try {
      const client = await Redis.getCommandClient();
      await client.publish(
        `shapes:${roomSlug}`,
        JSON.stringify({
          type,
          roomSlug,
          userId,
          x,
          y,
        })
      );
    } catch (e) {
      console.log("error in publishJoinMessage: " + e);
    }
  }
}
