import { RedisClientType, createClient } from "redis";
import { WebSocket } from "ws";
import { usersProps } from "@repo/types/types";

const subscribedRooms = new Set<string>();

export class Redis {
  private static commandClient: RedisClientType | null = null;
  private static subscriberClient: RedisClientType | null = null;
  private static readonly shapesQueueKey = "shapes:232392834ffierveru";

  public static async getCommandClient(): Promise<RedisClientType> {
    if (!Redis.commandClient) {
      Redis.commandClient = createClient();

      Redis.commandClient.on("error", (err) => {
        console.error("Redis Error:", err);
      });

      await Redis.commandClient.connect();
    }

    return Redis.commandClient;
  }

  public static async getSubscriberClient(): Promise<RedisClientType> {
    if (!Redis.subscriberClient) {
      Redis.subscriberClient = createClient();

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
          users.forEach((u) => {
            if (u.roomSlug === roomSlug) {
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
      console.log("in the putShapesInQueue");
      const redis = await Redis.getCommandClient();
      console.log(message);
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
      console.log("in the pickupShapesAndPutInDb");
      while (true) {
        const result = await client.brPop(Redis.shapesQueueKey, 0);
        if (result) {
          const data = JSON.parse(result.element);

          console.log(data);

          await handler(data);

          await client.publish(
            `shapes:${data.roomSlug}`,
            JSON.stringify({ message: data.message, type: data.type })
          );
        }
      }
    } catch (e) {
      console.log("error in pickupShapesAndPutInDb: " + e);
    }
  }
}
