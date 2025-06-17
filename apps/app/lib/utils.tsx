import { ReactElement } from "react";
import { BiRedo } from "react-icons/bi";
import { BsEraser, BsTriangle } from "react-icons/bs";
import { CiText } from "react-icons/ci";
import { FaRegCircle, FaRegHandPaper, FaRegSquare } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { GrUndo } from "react-icons/gr";
import { TfiLayoutLineSolid } from "react-icons/tfi";

export type selectedTools =
  | "square"
  | "circle"
  | "line"
  | "triangle"
  | "eraser"
  | "hand"
  | "undo"
  | "redo"
  | "download"
  | "text";

interface TopBarItemProps {
  icon: ReactElement;
  label: selectedTools;
}

export const topBarItems: TopBarItemProps[] = [
  { icon: <FaRegSquare />, label: "square" },
  { icon: <FaRegCircle />, label: "circle" },
  { icon: <BsTriangle />, label: "triangle" },
  { icon: <TfiLayoutLineSolid />, label: "line" },
  { icon: <FaRegHandPaper />, label: "hand" },
  { icon: <BsEraser />, label: "eraser" },
  { icon: <FiDownload />, label: "download" },
  { icon: <CiText />, label: "text" },
];

interface RedoItemsProps {
  icon: ReactElement;
  label: selectedTools;
}

export const redoItems: RedoItemsProps[] = [
  { icon: <GrUndo />, label: "undo" },
  { icon: <BiRedo />, label: "redo" },
];

export type Shapes =
  | {
      id?: string;
      type: "square";
      x: number;
      y: number;
      w: number;
      h: number;
      width: number;
      strokeColor: string;
      fillColor?: string;
      strokeStyle?: string;
      opacity: number;
    }
  | {
      id?: string;
      type: "circle";
      x: number;
      y: number;
      r: number;
      width: number;
      strokeColor: string;
      fillColor?: string;
      strokeStyle?: string;
      opacity: number;
    }
  | {
      id?: string;
      type: "line";
      x: number;
      y: number;
      cx: number;
      cY: number;
      width: number;
      strokeColor: string;
      fillColor?: string;
      strokeStyle?: string;
      opacity: number;
    }
  | {
      id?: string;
      type: "triangle";
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      x3: number;
      y3: number;
      width: number;
      strokeColor: string;
      fillColor?: string;
      strokeStyle?: string;
      opacity: number;
    };

export function getDistanceToCircle({
  canvasMouseX,
  canvasMouseY,
  mouseX,
  mouseY,
}: {
  canvasMouseX: number;
  canvasMouseY: number;
  mouseX: number;
  mouseY: number;
}) {
  let dx = canvasMouseX - mouseX;
  let dy = canvasMouseY - mouseY;
  return Math.sqrt(dx * dx + dy * dy);
}

export function getDistanceToSquare({
  canvasMouseX,
  canvasMouseY,
  squareX,
  squareY,
  squareW,
  squareH,
}: {
  canvasMouseX: number;
  canvasMouseY: number;
  squareX: number;
  squareY: number;
  squareW: number;
  squareH: number;
}) {
  const closestX = Math.max(squareX, Math.min(canvasMouseX, squareX + squareW));
  const closestY = Math.max(squareY, Math.min(canvasMouseY, squareY + squareH));

  const dx = canvasMouseX - closestX;
  const dy = canvasMouseY - closestY;

  return Math.sqrt(dx * dx + dy * dy);
}

export function getDistanceToLine({
  canvasMouseX,
  canvasMouseY,
  lineStartX,
  lineStartY,
  lineEndX,
  lineEndY,
}: {
  canvasMouseX: number;
  canvasMouseY: number;
  lineStartX: number;
  lineStartY: number;
  lineEndX: number;
  lineEndY: number;
}) {
  // vector A = line segment
  const Ax = lineEndX - lineStartX;
  const Ay = lineEndY - lineStartY;

  // vector B = from line start to mouse
  const Bx = canvasMouseX - lineStartX;
  const By = canvasMouseY - lineStartY;

  // project B onto A to find closest point P on the infinite line
  const t = Math.max(0, Math.min(1, (Ax * Bx + Ay * By) / (Ax * Ax + Ay * Ay)));
  const Px = lineStartX + t * Ax;
  const Py = lineStartY + t * Ay;

  // distance mouse → P
  const dx = canvasMouseX - Px;
  const dy = canvasMouseY - Py;
  return Math.sqrt(dx * dx + dy * dy);
}

export function getDistanceToTriangle({
  canvasMouseX,
  canvasMouseY,
  triX1,
  triY1,
  triX2,
  triY2,
  triX3,
  triY3,
}: {
  canvasMouseX: number;
  canvasMouseY: number;
  triX1: number;
  triY1: number;
  triX2: number;
  triY2: number;
  triX3: number;
  triY3: number;
}) {
  // Helper: distance from point to line segment
  function pointToLineDistance(
    px: number,
    py: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) {
    const A = x2 - x1;
    const B = y2 - y1;
    const t = Math.max(
      0,
      Math.min(1, ((px - x1) * A + (py - y1) * B) / (A * A + B * B))
    );
    const projX = x1 + t * A;
    const projY = y1 + t * B;
    const dx = px - projX;
    const dy = py - projY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  // Helper: check if point is inside triangle using barycentric coordinates
  function isPointInTriangle(
    px: number,
    py: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number
  ) {
    const denominator = (y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3);
    const a = ((y2 - y3) * (px - x3) + (x3 - x2) * (py - y3)) / denominator;
    const b = ((y3 - y1) * (px - x3) + (x1 - x3) * (py - y3)) / denominator;
    const c = 1 - a - b;
    return a >= 0 && b >= 0 && c >= 0 && a <= 1 && b <= 1 && c <= 1;
  }

  // If point is inside the triangle, distance is zero
  if (
    isPointInTriangle(
      canvasMouseX,
      canvasMouseY,
      triX1,
      triY1,
      triX2,
      triY2,
      triX3,
      triY3
    )
  ) {
    return 0;
  }

  // Otherwise, calculate distance to each edge and take the minimum
  const d1 = pointToLineDistance(
    canvasMouseX,
    canvasMouseY,
    triX1,
    triY1,
    triX2,
    triY2
  );
  const d2 = pointToLineDistance(
    canvasMouseX,
    canvasMouseY,
    triX2,
    triY2,
    triX3,
    triY3
  );
  const d3 = pointToLineDistance(
    canvasMouseX,
    canvasMouseY,
    triX3,
    triY3,
    triX1,
    triY1
  );

  return Math.min(d1, d2, d3);
}

export function getSelectedShapeDistance({
  existingShapes,
  currentX,
  currentY,
}: {
  existingShapes: any[];
  currentX: number;
  currentY: number;
}) {
  for (let i = 0; i < existingShapes.length; i++) {
    const item = existingShapes[i];
    let distance = Infinity;

    if (item.type === "square") {
      distance = getDistanceToSquare({
        canvasMouseX: currentX,
        canvasMouseY: currentY,
        squareH: item.h,
        squareW: item.w,
        squareX: item.x,
        squareY: item.y,
      });
    }

    if (item.type === "circle") {
      distance = getDistanceToCircle({
        canvasMouseX: currentX,
        canvasMouseY: currentY,
        mouseX: item.x,
        mouseY: item.y,
      });

      if (distance <= item.r) distance = 0;
    }

    if (item.type === "line") {
      distance = getDistanceToLine({
        canvasMouseX: currentX,
        canvasMouseY: currentY,
        lineStartX: item.x,
        lineStartY: item.y,
        lineEndX: item.cx,
        lineEndY: item.cY,
      });

      if (distance <= 5) distance = 0;
    }

    if (item.type === "triangle") {
      distance = getDistanceToTriangle({
        canvasMouseX: currentX,
        canvasMouseY: currentY,
        triX1: item.x1,
        triY1: item.y1,
        triX2: item.x2,
        triY2: item.y2,
        triX3: item.x3,
        triY3: item.y3,
      });
    }

    if (distance === 0) {
      return {
        found: true,
        index: i,
        item,
        distance,
      };
    }
  }

  return {
    found: false,
    index: null,
    item: null,
    distance: Infinity,
  };
}

export interface FormDataTypes {
  strokeColor?: string | null;
  bgColor?: string | null;
  strokeWidth?: number | null;
  strokeStyle?: string | null;
  opacity?: number | null;
}

export const HTTP_URL = "http://localhost:5000/api/v1";
export const WS_URL = "http://localhost:9000";
