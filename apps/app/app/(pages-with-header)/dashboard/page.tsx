import React from "react";
import { FaProjectDiagram } from "react-icons/fa";

const page = () => {
  const cards = [
    {
      title: "Marketing Flowchart",
      id: "marketing-flowchart-2023a89b3c",
      lastEdited: "20/10/2025",
    },
  ];

  return (
    <div className="w-full min-h-[80vh] max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      {cards.map((card, index) => (
        <div
          key={index}
          className="w-full h-[200px] flex flex-col justify-between items-start rounded-lg border-2 border-neutral-400 dark:border-neutral-600 p-5 bg-white dark:bg-neutral-800 shadow-sm hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
        >
          <div className="w-full flex flex-col justify-center items-start">
            <div className="w-full flex items-center gap-3 mb-3">
              <FaProjectDiagram className="text-2xl text-blue-500" />
              <h1 className="text-lg font-semibold text-black dark:text-white">
                {card.title}
              </h1>
            </div>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm">
              Slug: {card.id}
            </p>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 text-xs self-end">
            Last edited: {card.lastEdited}
          </p>
        </div>
      ))}
    </div>
  );
};

export default page;
