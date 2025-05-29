import { Redis } from "@repo/redis/db";
import { prisma } from "@repo/db/db";

const main = async () => {
  await Redis.pickupShapesAndPutInDb(async (data) => {
    try {
      const room = await prisma.room.findUnique({
        where: {
          slug: data.roomSlug,
        },
      });

      if (!room) {
        return;
      }

      await prisma.shapes.create({
        data: {
          userId: data.userId,
          roomId: room.id,
          message: data.message,
        },
      });
    } catch (e) {
      console.log("error in worker: " + e);
    }
  });
};

main().catch((e) => {
  console.log("error is worker: " + e);
  process.exit(1);
});
