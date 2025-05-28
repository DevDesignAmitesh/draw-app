import { createClient, RedisClientType } from "redis";

class Redis {
  private static client: RedisClientType | null = null;

  public static async getInstance(): Promise<RedisClientType> {
    if (!Redis.client) {
      Redis.client = createClient();

      Redis.client.on("error", (err) =>
        console.error("Redis Client Error", err)
      );

      await Redis.client.connect();
    }
    return Redis.client;
  }
}

export const addShapesToQueueKey = "shapes_89wdcwdhc9982dh5794";

export const addShapesToQueue = async (
  message: string,
  roomId: string,
  userId: string
) => {
  try {
    const redis = await Redis.getInstance();
    await redis.lPush(
      addShapesToQueueKey,
      JSON.stringify({ message, roomId, userId })
    );
  } catch (error) {
    console.log(error);
  }
};

export const addQueuedShapesInDb = async (
  handler: (data: any) => Promise<void>
) => {
  try {
    const redis = await Redis.getInstance();
    while (true) {
      const result = await redis.brPop(addShapesToQueueKey, 0);
      let data = "{}";
      if (result) {
        data = JSON.parse(result.element);
      }
      await handler(data);
    }
  } catch (error) {
    console.log(error);
  }
};
