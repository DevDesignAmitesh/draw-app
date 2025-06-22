import React from "react";
import { FaProjectDiagram } from "react-icons/fa";
import Link from "next/link";
import { getAllRooms } from "@/draw/server-http";

const Dashboard = async () => {
  const cards: any[] = await getAllRooms();

  if (!Array.isArray(cards)) {
    return <div>rooms not found</div>;
  }

  console.log(cards);

  const formatDate = (date: string) => {
    const d = new Date(date);

    const day = String(d.getDate()).padStart(2, "0"); // 01 - 31
    const month = String(d.getMonth() + 1).padStart(2, "0"); // 01 - 12
    const year = d.getFullYear(); // 2025

    return `${day}/${month}/${year}`; // or `${year}-${month}-${day}`
  };

  return (
    <div className="w-full min-h-[80vh] max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-30 md:px-10 px-4">
      {cards.map((card) => (
        <Link
          href={`/canvas/${card.slug}`}
          key={card.id}
          className="relative w-full h-[200px] flex flex-col justify-between items-start rounded-lg border-2 border-neutral-400 dark:border-neutral-600 p-5 bg-white dark:bg-neutral-800 shadow-sm hover:shadow-lg transition-all tracking-wider hover:scale-[1.02] cursor-pointer"
        >
          <div className="w-full flex flex-col justify-center items-start">
            <div className="w-full flex items-center gap-3 mb-3">
              <FaProjectDiagram className="text-2xl text-blue-500" />
              <h1 className="text-lg font-medium text-black dark:text-white">
                {card.name}
              </h1>
            </div>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm">
              <span className="text-[18px]">Slug:</span> {card.slug}
            </p>
          </div>
          <p className="absolute right-4 bottom-4 dark:text-white text-black text-[15px]">
            Created At: {formatDate(card.createdAt)}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default Dashboard;
