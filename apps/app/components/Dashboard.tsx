import React from "react";
import { FaProjectDiagram } from "react-icons/fa";
import Link from "next/link";
import { getAllRooms } from "@/draw/server-http";

const Dashboard = async () => {
  const cards: { name: string; id: string; slug: string }[] =
    await getAllRooms();

  if (!Array.isArray(cards)) {
    return <div>rooms not found</div>;
  }

  return (
    <div className="w-full min-h-[80vh] max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center place-content-center">
      {cards.map((card) => (
        <Link
          href={`/canvas/${card.slug}`}
          key={card.id}
          className="w-full h-[200px] flex flex-col justify-between items-start rounded-lg border-2 border-neutral-400 dark:border-neutral-600 p-5 bg-white dark:bg-neutral-800 shadow-sm hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
        >
          <div className="w-full flex flex-col justify-center items-start">
            <div className="w-full flex items-center gap-3 mb-3">
              <FaProjectDiagram className="text-2xl text-blue-500" />
              <h1 className="text-lg font-semibold text-black dark:text-white">
                {card.name}
              </h1>
            </div>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm">
              Slug: {card.slug}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Dashboard;
