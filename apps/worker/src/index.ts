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

      if (data.type === "shapes") {
        const parsedMessage = JSON.parse(data.message);
        await prisma.shapes.create({
          data: {
            id: parsedMessage.id,
            userId: data.userId,
            roomId: room.id,
            message: data.message,
          },
        });
      }
      if (data.type === "delete_shape") {
        await prisma.shapes.delete({
          where: {
            id: data.message,
            roomId: room.id,
          },
        });
      }
      if (data.type === "update_shape") {
        const shapeId = JSON.parse(data.message).id;
        await prisma.shapes.update({
          where: {
            id: shapeId,
            roomId: room.id,
          },
          data: {
            message: data.message,
          },
        });
      }
    } catch (e) {
      console.log("error in worker: " + e);
    }
  });
};

main().catch((e) => {
  console.log("error is worker: " + e);
  process.exit(1);
});
