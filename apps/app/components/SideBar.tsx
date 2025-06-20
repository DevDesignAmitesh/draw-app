import { FormDataTypes } from "@/lib/utils";
import React from "react";
import ToggleBtn from "./ToggleBtn";

const strokeColors = ["#E0E0E0", "#F87171", "#6EE7B7", "#FACC15", "#FB923C"];
const fillColor = ["#E0E0E0", "#F87171", "#6EE7B7", "#FACC15", "#FB923C"];
const bgColors = ["#121212", "#fff", "#10B981", "#F59E0B", "#111827"];
const strokeWidths = [2, 4, 6];
const strokeStyles = ["solid", "dashed", "dotted"];

const SideBar = ({
  details,
  setDetails,
}: {
  details: FormDataTypes;
  setDetails: React.Dispatch<React.SetStateAction<FormDataTypes>>;
}) => {
  const buttonClass = (active: boolean) =>
    `flex items-center justify-center h-9 w-9 rounded-md border border-transparent cursor-pointer
    ${active ? "bg-[#E0DFFF] dark:bg-[#4F4D6F]" : ""}
    hover:bg-[#E0DFFF] dark:hover:bg-[#4F4D6F]`;

  return (
    <div className="absolute left-5 top-12 w-[220px] rounded-xl dark:bg-[#232329] bg-white dark:text-[#D1D1E2] text-[#29294A] border border-neutral-600 p-4 flex flex-col justify-start items-start gap-5 shadow-lg">
      {/* Stroke */}
      <div>
        <p className="text-sm font-medium mb-2">Stroke</p>
        <div className="flex gap-2 flex-wrap">
          {strokeColors.map((color) => (
            <div
              key={color}
              className={`h-6 w-6 rounded-md border-2 ${details.strokeColor === color ? "border-[#E0DFFF] dark:border-[#4F4D6F]" : "border-transparent"} cursor-pointer`}
              style={{ backgroundColor: color }}
              onClick={() => setDetails({ ...details, strokeColor: color })}
            />
          ))}
        </div>
      </div>

      {/* Text Color */}
      {details.type === "text" && (
        <div>
          <p className="text-sm font-medium mb-2">Text Color</p>
          <div className="flex gap-2 flex-wrap">
            {fillColor.map((color) => (
              <div
                key={color}
                className={`h-6 w-6 rounded-md border-2 ${details.textColor === color ? "border-[#E0DFFF] dark:border-[#4F4D6F]" : "border-transparent"} cursor-pointer`}
                style={{ backgroundColor: color }}
                onClick={() => setDetails({ ...details, textColor: color })}
              />
            ))}
          </div>
        </div>
      )}

      {/* Background */}
      {(details.type === "square" ||
        details.type === "circle" ||
        details.type === "triangle") && (
        <div>
          <p className="text-sm font-medium mb-2">Background</p>
          <div className="flex gap-2 flex-wrap">
            {bgColors.map((color) => (
              <div
                key={color}
                className={`h-6 w-6 rounded-md border-2 ${details.bgColor === color ? "border-[#E0DFFF] dark:border-[#4F4D6F]" : "border-transparent"} cursor-pointer`}
                style={{ backgroundColor: color }}
                onClick={() => setDetails({ ...details, bgColor: color })}
              />
            ))}
          </div>
        </div>
      )}

      {/* Stroke Width */}
      <div>
        <p className="text-sm font-medium mb-2">Stroke Width</p>
        <div className="flex gap-2">
          {strokeWidths.map((width) => (
            <button
              key={width}
              className={buttonClass(details.strokeWidth === width)}
              onClick={() => setDetails({ ...details, strokeWidth: width })}
            >
              <div
                className="w-6 bg-current rounded"
                style={{ height: width }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Stroke Style */}
      <div>
        <p className="text-sm font-medium mb-2">Stroke Style</p>
        <div className="flex gap-2">
          {strokeStyles.map((style) => (
            <button
              key={style}
              className={buttonClass(details.strokeStyle === style)}
              onClick={() => setDetails({ ...details, strokeStyle: style })}
            >
              <div className="w-6 border-b-2" style={{ borderStyle: style }} />
            </button>
          ))}
        </div>
      </div>

      {/* Opacity */}
      <div>
        <p className="text-sm font-medium mb-2">Opacity</p>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={details.opacity ?? 0}
          onChange={(e) =>
            setDetails({ ...details, opacity: Number(e.target.value) })
          }
          className="w-full accent-[#6C63FF]"
        />
        <div className="text-xs text-center mt-1">{details.opacity}</div>
      </div>
    </div>
  );
};

export default SideBar;
