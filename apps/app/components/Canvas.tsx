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
import ToggleBtn from "./ToggleBtn";
import { OthersMap } from "./MainCanvas";
import Button from "./new/Button";
import { RxHamburgerMenu } from "react-icons/rx";
import SharePopup from "./popup/SharePopup";

type popup = "second-sidebar" | "share" | null;

const Canvas = ({
  roomSlug,
  socket,
  userId,
  setOthers,
}: {
  roomSlug: string;
  socket: WebSocket;
  userId: string;
  setOthers: React.Dispatch<React.SetStateAction<OthersMap>>;
}) => {
  const [draw, setDraw] = useState<Draw>();
  const [selectedTools, setSelectedTools] = useState<selectedTools>("hand");
  const [sideBar, setSideBar] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();

    const dropX = e.clientX - rect.left;
    const dropY = e.clientY - rect.top;

    const imgUrl = e.dataTransfer.getData("URL");
    const img = new Image(100, 100);
    img.src = imgUrl;
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (draw) {
        draw.addingImageInExistingShapes(img, dropX, dropY);
      }
    };
  };

  // share url and second side-bar popup state
  const [popup, setPopup] = useState<popup>(null);

  const [activeInput, setActiveInput] = useState<{
    x: number;
    y: number;
    text: string;
  } | null>(null);

  const { theme } = useContext(ThemeContext);
  const detailsRef = useRef<FormDataTypes | null>(null);

  const handleBlur = () => {
    if (activeInput && activeInput.text.trim() !== "") {
      if (draw && detailsRef.current) {
        console.log(detailsRef.current);
        const effectiveDetails = detailsRef.current ?? {
          strokeColor: theme === "dark" ? "#fff" : "#000",
          textColor: theme === "dark" ? "#fff" : "#000",
          bgColor: theme === "dark" ? "#121212" : "#fff",
          strokeStyle: "solid",
          opacity: 1,
        };

        if (typeof effectiveDetails.textColor === "undefined") {
          return;
        }

        draw.addingTextInExistingShapes({
          id: uuidv4(),
          type: "text",
          x: activeInput.x,
          y: activeInput.y,
          text: activeInput.text,
          width: 2,
          strokeColor: effectiveDetails.strokeColor!,
          fillColor: effectiveDetails.bgColor!,
          strokeStyle: effectiveDetails.strokeStyle!,
          opacity: effectiveDetails.opacity!,
          textColor: effectiveDetails.textColor!,
        });
      }
    }
    setActiveInput(null);
  };

  const [details, setDetails] = useState<FormDataTypes>({
    strokeColor: theme === "dark" ? "#fff" : "#000",
    textColor: theme === "dark" ? "#fff" : "#000",
    bgColor: theme === "dark" ? "#121212" : "#fff",
    strokeWidth: 2,
    strokeStyle: "solid",
    opacity: 1,
    type: null,
  });

  useEffect(() => {
    if (canvasRef.current) {
      const draw = new Draw(
        setOthers,
        canvasRef.current,
        socket,
        roomSlug,
        theme,
        details,
        setDetails,
        setSideBar,
        userId,
        setActiveInput
      );
      setDraw(draw);

      draw.loadAllShapes(roomSlug);
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
      draw.changeStyles(details);
    }
  }, [details]);

  useEffect(() => {
    const updatedDetails = {
      ...details,
      strokeColor:
        details.strokeColor === "#fff" || details.strokeColor === "#000"
          ? theme === "dark"
            ? "#fff"
            : "#000"
          : details.strokeColor,
      textColor:
        details.textColor === "#fff" || details.textColor === "#000"
          ? theme === "dark"
            ? "#fff"
            : "#000"
          : details.textColor,
      bgColor:
        details.bgColor === "#121212" || details.bgColor === "#fff"
          ? theme === "dark"
            ? "#121212"
            : "#fff"
          : details.bgColor,
    };

    setDetails(updatedDetails);
    if (draw) {
      draw.changeStyles(updatedDetails);
      draw.changeTheme(theme);
    }
  }, [theme]);

  useEffect(() => {
    detailsRef.current = details;
  }, [theme, details]);

  const openPopup = (input: popup) => {
    setPopup(input);
  };

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
        <ToggleBtn />
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

      <canvas
        className={`
          ${selectedTools === "hand" && "cursor-grab"}
          ${selectedTools === "text" && "cursor-text"}
          ${selectedTools === "text" && "cursor-text"}
          ${selectedTools === "eraser" && "custom-cursor-rubber"}
          ${selectedTools !== "hand" && selectedTools !== "text" && selectedTools !== "eraser" && "cursor-crosshair"}
          `}
        width={window.innerWidth}
        height={window.innerHeight}
        ref={canvasRef}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e)}
      />

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
          onBlur={handleBlur}
          value={activeInput.text}
          className="absolute z-50 p-2 outline-none bg-transparent"
        />
      )}

      {/* this will first open a popup and there we will add the copy fn and then closing it */}
      <button
        className="dark:bg-[#4F4D6F] rounded-md bg-[#5B57D1] dark:text-neutral-50 text-neutral-50 py-2 px-4 absolute top-5 right-4 cursor-pointer font-normal"
        onClick={() => openPopup("share")}
      >
        Share
      </button>

      {/* this will toggle a side bar which will have many options and the theme button also */}
      <button
        onClick={() => openPopup("second-sidebar")}
        className="dark:bg-[#232329] rounded-md bg-[#F1F0FF] dark:text-neutral-200 text-neutral-800 p-3 absolute top-6 left-4 cursor-pointer flex justify-center items-center"
      >
        <RxHamburgerMenu size={14} fontWeight={900} />
      </button>

      {popup === "share" && (
        <SharePopup roomSlug={roomSlug} onClick={() => setPopup(null)} />
      )}
    </div>
  );
};

export default Canvas;
