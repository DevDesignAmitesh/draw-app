"use client";

import { Draw } from "@/draw/Draw";
import {
  FormDataTypes,
  redoItems,
  selectedTools,
  topBarItems,
} from "@/lib/utils";
import React, { useContext, useEffect, useRef, useState } from "react";
import SideBar from "./SideBar";
import { ThemeContext } from "@/lib/ThemeProvider";
import { v4 as uuidv4 } from "uuid";

const Canvas = ({
  roomSlug,
  socket,
  userId,
}: {
  roomSlug: string;
  socket: WebSocket;
  userId: string;
}) => {
  const [draw, setDraw] = useState<Draw>();
  const [selectedTools, setSelectedTools] = useState<selectedTools>("hand");
  const [sideBar, setSideBar] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [textBoxes, setTextBoxes] = useState<
    { id: string; x: number; y: number; text: string }[]
  >([]);

  const [activeInput, setActiveInput] = useState<{
    x: number;
    y: number;
    text: string;
  } | null>(null);

  const { theme } = useContext(ThemeContext);

  const [details, setDetails] = useState<FormDataTypes>({
    strokeColor: theme === "dark" ? "#fff" : "#000",
    bgColor: theme === "dark" ? "#121212" : "#fff",
    strokeWidth: 2,
    strokeStyle: "solid",
    opacity: 1,
  });

  useEffect(() => {
    if (canvasRef.current) {
      const draw = new Draw(
        canvasRef.current,
        socket,
        roomSlug,
        theme,
        details,
        setDetails,
        setSideBar,
        userId,
        setActiveInput,
        textBoxes
      );
      setDraw(draw);

      return () => {
        draw.destroyCanvasHandler();
      };
    }
  }, []);

  useEffect(() => {
    if (draw) {
      draw.changeSelectedTool(selectedTools);
    }
  }, [selectedTools]);

  useEffect(() => {
    if (draw) {
      draw.changeTheme(theme);
    }
  }, [theme]);

  useEffect(() => {
    if (draw) {
      draw.changeStyles(details);
    }
  }, [details]);

  useEffect(() => {
    if (draw) {
      console.log("in the frontend");
      draw.updateTextBoxes(textBoxes);
    }
  }, [textBoxes, activeInput]);

  return (
    <div className="w-full h-screen overflow-hidden relative">
      {/* top bar */}
      <div className="px-2 py-1 rounded-md dark:bg-[#232329] dark:text-white text-black bg-white absolute top-4 left-1/2 transform -translate-x-1/2 flex gap-1 border border-neutral-600">
        {topBarItems.map((item) => {
          const isSelected = selectedTools === item.label;

          return (
            <button
              onClick={() => {
                setSelectedTools(item.label);
                item.label === "download" && draw?.downloadImage();
              }}
              key={item.label}
              className={`p-3 cursor-pointer rounded transition
          ${
            isSelected
              ? "bg-[#E0DFFF] dark:bg-[#4F4D6F]"
              : "hover:bg-[#E0DFFF] dark:hover:bg-[#4F4D6F]"
          }`}
              title={item.label}
            >
              {item.icon}
            </button>
          );
        })}
      </div>

      {/* left bottom bar */}
      <div className="px-2 py-1 rounded-md dark:bg-[#232329] dark:text-white text-black bg-white absolute bottom-5 right-5 flex gap-1 border border-neutral-600">
        {redoItems.map((item) => {
          const isSelected = selectedTools === item.label;

          return (
            <button
              onClick={() => {
                setSelectedTools(item.label);
                item.label === "redo"
                  ? draw?.redoLastShape()
                  : draw?.undoLastShape();
              }}
              key={item.label}
              className={`p-3 cursor-pointer rounded transition
          ${
            isSelected
              ? "bg-[#E0DFFF] dark:bg-[#4F4D6F]"
              : "hover:bg-[#E0DFFF] dark:hover:bg-[#4F4D6F]"
          }`}
              title={item.label}
            >
              {item.icon}
            </button>
          );
        })}
      </div>

      {sideBar && <SideBar details={details} setDetails={setDetails} />}

      <canvas ref={canvasRef} />

      {activeInput && (
        <input
          type="text"
          autoFocus
          ref={inputRef}
          style={{
            top: activeInput.y,
            left: activeInput.x,
            color: theme === "dark" ? "#fff" : "#000",
          }}
          onChange={(e) =>
            setActiveInput({ ...activeInput, text: e.target.value })
          }
          onBlur={() => {
            if (activeInput && activeInput.text.trim() !== "") {
              if (draw) {
                draw.addingTextInExistingShapes({
                  id: uuidv4(),
                  type: "text",
                  x: activeInput.x,
                  y: activeInput.y,
                  text: activeInput.text,
                  width: 2, // Default width for text
                  strokeColor: details.strokeColor || "#fff",
                  fillColor: details.bgColor ?? "",
                  strokeStyle: details.strokeStyle ?? "",
                  opacity: details.opacity || 1,
                });
              }
            }
            setActiveInput(null);
          }}
          value={activeInput.text}
          className="absolute z-50 p-2 outline-none bg-transparent"
        />
      )}
    </div>
  );
};

export default Canvas;
