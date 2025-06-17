import {
  FormDataTypes,
  getSelectedShapeDistance,
  selectedTools,
  Shapes,
} from "@/lib/utils";
import { getAllShapes } from "./client-http";
import { v4 as uuidv4 } from "uuid";

export class Draw {
  private ws: WebSocket;
  private roomSlug: string;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private selectedTools: selectedTools;
  private startX: number;
  private startY: number;
  private currentX: number;
  private currentY: number;
  private isDrawing: boolean;
  private selectedId: number | null;
  public existingShapes: Shapes[];
  public undoShapes: Shapes[];
  public strokeWidth: number;
  public strokeStyle: string;
  public strokeColor: string | null;
  public details: FormDataTypes;
  private originalColors: Map<number, string> = new Map();
  private setDetails: React.Dispatch<React.SetStateAction<FormDataTypes>>;
  private setSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  private opacity: number;
  private fillColor: string | null;
  private userId: string;
  public setActiveInput: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
      text: string;
    } | null>
  >;
  public textBoxes: {
    id: string;
    x: number;
    y: number;
    text: string;
  }[];

  constructor(
    canvas: HTMLCanvasElement,
    ws: WebSocket,
    roomSlug: string,
    theme: string,
    details: FormDataTypes,
    setDetails: React.Dispatch<React.SetStateAction<FormDataTypes>>,
    setSideBar: React.Dispatch<React.SetStateAction<boolean>>,
    userId: string,
    setActiveInput: React.Dispatch<
      React.SetStateAction<{
        x: number;
        y: number;
        text: string;
      } | null>
    >,
    textBoxes: {
      id: string;
      x: number;
      y: number;
      text: string;
    }[]
  ) {
    this.userId = userId;
    this.textBoxes = textBoxes;
    this.details = details;
    this.setDetails = setDetails;
    this.setSideBar = setSideBar;
    this.setActiveInput = setActiveInput;
    this.strokeColor = theme === "dark" ? "#fff" : "#000";
    this.strokeWidth = 2;
    this.strokeStyle = "solid";
    this.fillColor = theme === "dark" ? "#232329" : "#fff";
    this.opacity = 1;
    this.existingShapes = [];
    this.undoShapes = [];
    this.selectedId = null;
    this.canvas = canvas;
    this.context = canvas.getContext("2d")!;
    this.isDrawing = false;
    this.selectedTools = "hand";
    this.ws = ws;
    this.roomSlug = roomSlug;
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.renderAllShapes(this.textBoxes);
    this.loadAllShapes(roomSlug);
    this.webSockerInitHandler();
    this.startHandler();
    this.startCanvasHandler();
  }

  public loadAllShapes = async (slug: string) => {
    try {
      this.existingShapes = await getAllShapes(slug);
      this.renderAllShapes(this.textBoxes);
    } catch (error) {
      console.log(error);
    }
  };

  public webSockerInitHandler = () => {
    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log(data);

        if (data.type === "shapes") {
          const shapes = JSON.parse(data.message);
          this.existingShapes.push(shapes);
        }

        if (data.type === "delete_shape") {
          this.existingShapes = this.existingShapes.filter(
            (s) => s.id !== data.message
          );
        }

        if (data.type === "update_shape") {
          const updatedShape = JSON.parse(data.message);
          this.existingShapes = this.existingShapes.map((shape) =>
            shape.id === updatedShape.id ? updatedShape : shape
          );
        }
        this.renderAllShapes(this.textBoxes);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };
  };

  public sendMessageViaWebSocket = (shape: Shapes) => {
    let data = {
      message: JSON.stringify(shape),
      roomSlug: this.roomSlug,
      userId: this.userId,
    };
    console.log(data);
    this.ws.send(
      JSON.stringify({
        type: "shapes",
        payload: data,
      })
    );
  };

  public changeTheme(theme: string) {
    const themeColor = theme === "dark" ? "#fff" : "#000";

    if (this.strokeColor === "#000" || this.strokeColor === "#fff") {
      this.strokeColor = themeColor;
    }

    this.existingShapes.forEach((item, index) => {
      const originalColor = item.strokeColor;
      if (!this.originalColors.has(index)) {
        if (originalColor === "#000" || originalColor === "#fff") {
          item.strokeColor = this.strokeColor!;
        }
      }
    });

    this.renderAllShapes(this.textBoxes);
  }

  public changeStyles(data: FormDataTypes) {
    if (this.selectedId !== null) {
      let selectedShape = this.existingShapes[this.selectedId];

      const newColor = data.strokeColor ?? selectedShape.strokeColor;
      const newWidth = data.strokeWidth ?? selectedShape.width;
      const newStyle = data.strokeStyle ?? selectedShape.strokeStyle;
      const newOpacity = data.opacity ?? selectedShape.opacity;
      const newBg = data.bgColor ?? selectedShape.fillColor;

      selectedShape.strokeColor = newColor;
      selectedShape.width = newWidth;
      selectedShape.strokeStyle = newStyle;
      selectedShape.opacity = newOpacity;
      selectedShape.fillColor = newBg;

      this.ws.send(
        JSON.stringify({
          type: "update_shape",
          payload: {
            message: JSON.stringify(selectedShape),
            roomSlug: this.roomSlug,
            userId: this.userId,
          },
        })
      );

      this.originalColors.set(this.selectedId, newColor);

      selectedShape.strokeColor = "red";
    }

    this.strokeColor = data.strokeColor ?? this.strokeColor;
    this.strokeWidth = data.strokeWidth ?? this.strokeWidth;
    this.strokeStyle = data.strokeStyle ?? this.strokeStyle;
    this.opacity = data.opacity ?? this.opacity;
    this.fillColor = data.bgColor ?? this.fillColor;

    this.renderAllShapes(this.textBoxes);
  }

  public renderAllShapes = (
    textBoxes: {
      id: string;
      x: number;
      y: number;
      text: string;
    }[]
  ) => {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.existingShapes.map((item) => {
      this.context.globalAlpha = item.opacity;
      this.context.beginPath();

      if (item.strokeStyle === "solid") {
        this.context.setLineDash([]);
      } else if (item.strokeStyle === "dotted") {
        this.context.setLineDash([2, 4]);
      } else if (item.strokeStyle === "dashed") {
        this.context.setLineDash([10, 5]);
      }
      this.context.lineWidth = item.width;

      if (item.type === "square") {
        this.drawSquare(item);
      } else if (item.type === "circle") {
        this.drawCircle(item);
      } else if (item.type === "line") {
        this.drawLine(item);
      } else if (item.type === "triangle") {
        this.drawTriangle(item);
      }

      if (item.fillColor) {
        this.context.fillStyle = item.fillColor!;
        this.context.fill();
      }

      this.context.strokeStyle = item.strokeColor;
      this.context.stroke();

      this.context.closePath();

      this.context.globalAlpha = 1;
    });
    textBoxes?.forEach((txtBox) => {
      console.log(txtBox);
      this.context.fillStyle = "white";
      this.context.font = "32px serif";
      this.context.fillText(txtBox.text, txtBox.x, txtBox.y);
    });
  };

  public changeSelectedTool = (tool: selectedTools) => {
    this.selectedTools = tool;
    this.selectedId = null;
    this.setSideBar(false);
    if (this.details.strokeColor) this.strokeColor = this.details.strokeColor;
    if (this.details.strokeWidth) this.strokeWidth = this.details.strokeWidth;
    if (this.details.strokeStyle) this.strokeStyle = this.details.strokeStyle;
    if (this.details.opacity) this.opacity = this.details.opacity;
    if (this.details.bgColor) this.fillColor = this.details.bgColor;
  };

  private startHandler = () => {
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  private startCanvasHandler = () => {
    this.canvas.addEventListener("mousedown", this.mouseDownHandler);
    this.canvas.addEventListener("mouseup", this.mouseUpHandler);
    this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
    this.canvas.addEventListener("click", this.mouseClickHandler);

    return () => {
      this.destroyCanvasHandler();
    };
  };

  public destroyCanvasHandler = () => {
    this.canvas.removeEventListener("mousedown", this.mouseDownHandler);
    this.canvas.removeEventListener("mouseup", this.mouseUpHandler);
    this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
    this.canvas.removeEventListener("click", this.mouseClickHandler);
  };

  private mouseDownHandler = (e: MouseEvent | TouchEvent) => {
    this.isDrawing = true;
    console.log("hello");
    let rect = this.canvas.getBoundingClientRect();
    if ("touches" in e) {
      this.startX = e.touches[0].clientX - rect.left;
      this.startY = e.touches[0].clientY - rect.top;
    } else {
      this.startX = e.clientX - rect.left;
      this.startY = e.clientY - rect.top;
    }
  };

  private mouseUpHandler = () => {
    this.isDrawing = false;
    let shape: Shapes;

    const currentStrokeColor = this.details.strokeColor || this.strokeColor!;
    const currentStrokeWidth = this.details.strokeWidth || this.strokeWidth;
    const currentStrokeStyle = this.details.strokeStyle || this.strokeStyle;
    const currentOpacity = this.details.opacity || this.opacity;
    const currentBg = this.details.bgColor || this.fillColor;

    if (this.selectedTools === "square") {
      let w = this.currentX - this.startX;
      let h = this.currentY - this.startY;
      shape = {
        id: uuidv4(),
        type: "square",
        x: this.startX,
        y: this.startY,
        w,
        h,
        width: currentStrokeWidth,
        opacity: currentOpacity,
        strokeColor: currentStrokeColor,
        strokeStyle: currentStrokeStyle,
        fillColor: currentBg!,
      };
      this.sendMessageViaWebSocket(shape);
      this.existingShapes.push(shape);
    }

    if (this.selectedTools === "circle") {
      let r = Math.sqrt(
        (this.currentX - this.startX) ** 2 + (this.currentY - this.startY) ** 2
      );
      shape = {
        id: uuidv4(),
        type: "circle",
        x: this.startX,
        y: this.startY,
        r,
        width: currentStrokeWidth,
        opacity: currentOpacity,
        strokeColor: currentStrokeColor,
        strokeStyle: currentStrokeStyle,
        fillColor: currentBg!,
      };
      this.sendMessageViaWebSocket(shape);
      this.existingShapes.push(shape);
    }

    if (this.selectedTools === "line") {
      shape = {
        id: uuidv4(),
        type: "line",
        x: this.startX,
        y: this.startY,
        cx: this.currentX,
        cY: this.currentY,
        width: currentStrokeWidth,
        opacity: currentOpacity,
        strokeColor: currentStrokeColor,
        strokeStyle: currentStrokeStyle,
        fillColor: currentBg!,
      };
      this.sendMessageViaWebSocket(shape);
      this.existingShapes.push(shape);
    }

    if (this.selectedTools === "triangle") {
      const x1 = this.startX;
      const y1 = this.startY;
      const x2 = this.currentX;
      const y2 = this.currentY;
      const x3 = x1 * 2 - x2;
      const y3 = y2;
      shape = {
        id: uuidv4(),
        type: "triangle",
        x1,
        y1,
        x2,
        y2,
        x3,
        y3,
        width: currentStrokeWidth,
        opacity: currentOpacity,
        strokeColor: currentStrokeColor,
        strokeStyle: currentStrokeStyle,
        fillColor: currentBg!,
      };
      this.sendMessageViaWebSocket(shape);
      this.existingShapes.push(shape);
    }
    this.renderAllShapes(this.textBoxes);
  };

  private mouseMoveHandler = (e: MouseEvent | TouchEvent) => {
    if (this.isDrawing) {
      let rect = this.canvas.getBoundingClientRect();
      if ("touches" in e) {
        this.currentX = e.touches[0].clientX - rect.left;
        this.currentY = e.touches[0].clientY - rect.top;
      } else {
        this.currentX = e.clientX - rect.left;
        this.currentY = e.clientY - rect.top;
      }

      this.renderAllShapes(this.textBoxes);

      const currentOpacity = this.details.opacity || this.opacity;
      this.context.globalAlpha = currentOpacity;

      this.context.beginPath();

      const currentStrokeStyle = this.details.strokeStyle || this.strokeStyle;
      const currentStrokeColor = this.details.strokeColor || this.strokeColor!;
      const currentStrokeWidth = this.details.strokeWidth || this.strokeWidth;
      const currentBg = this.details.bgColor || this.fillColor;

      if (currentStrokeStyle === "solid") {
        this.context.setLineDash([]);
      } else if (currentStrokeStyle === "dotted") {
        this.context.setLineDash([2, 4]);
      } else if (currentStrokeStyle === "dashed") {
        this.context.setLineDash([10, 5]);
      }
      this.context.lineWidth = currentStrokeWidth;

      if (this.selectedTools === "square") {
        this.drawSquare();
      }

      if (this.selectedTools === "circle") {
        this.drawCircle();
      }

      if (this.selectedTools === "line") {
        this.drawLine();
      }

      if (this.selectedTools === "triangle") {
        this.drawTriangle();
      }

      if (this.selectedTools === "eraser") {
        const result = getSelectedShapeDistance({
          existingShapes: this.existingShapes,
          currentX: this.currentX,
          currentY: this.currentY,
        });

        if (result.distance === 0 && result.index !== null) {
          const last = this.existingShapes[result.index];
          this.existingShapes.splice(result.index, 1);
          this.undoShapes.push(last);
          this.originalColors.delete(result.index);
          this.ws.send(
            JSON.stringify({
              type: "delete_shape",
              payload: {
                roomSlug: this.roomSlug,
                message: last.id,
                userId: this.userId,
              },
            })
          );
        }
      }

      if (currentBg) {
        this.context.fillStyle = currentBg!;
        this.context.fill();
      }

      this.context.strokeStyle = currentStrokeColor;
      this.context.stroke();

      this.context.closePath();

      this.context.globalAlpha = 1;

      if (this.selectedId !== null) {
        if (this.selectedTools === "hand") {
          let selectedShape = this.existingShapes[this.selectedId];
          if (selectedShape.type === "square") {
            selectedShape.x = this.currentX;
            selectedShape.y = this.currentY;
          }
          if (selectedShape.type === "circle") {
            selectedShape.x = this.currentX;
            selectedShape.y = this.currentY;
          }
          if (selectedShape.type === "line") {
            selectedShape.x = this.currentX;
            selectedShape.y = this.currentY;
          }
          if (selectedShape.type === "triangle") {
            selectedShape.x2 = this.currentX;
            selectedShape.y2 = this.currentY;
          }

          this.ws.send(
            JSON.stringify({
              type: "update_shape",
              payload: {
                message: JSON.stringify(selectedShape),
                roomSlug: this.roomSlug,
                userId: this.userId,
              },
            })
          );
        }
      }
    }
  };

  private mouseClickHandler = (e: MouseEvent | TouchEvent) => {
    if (this.selectedTools === "hand") {
      const rect = this.canvas.getBoundingClientRect();
      if ("touches" in e) {
        this.currentX = e.touches[0].clientX - rect.left;
        this.currentY = e.touches[0].clientY - rect.top;
      } else {
        this.currentX = e.clientX - rect.left;
        this.currentY = e.clientY - rect.top;
      }

      const result = getSelectedShapeDistance({
        existingShapes: this.existingShapes,
        currentX: this.currentX,
        currentY: this.currentY,
      });

      let shouldShowSidebar = false;

      if (result.distance === 0 && result.index !== null) {
        const originalColor =
          this.originalColors.get(result.index) || result.item.strokeColor;

        this.setDetails(() => ({
          strokeColor: originalColor,
          strokeWidth: result.item.width,
          strokeStyle: result.item.strokeStyle,
          opacity: result.item.opacity,
          bgColor: result.item.fillColor,
        }));

        if (this.selectedId === result.index) {
          result.item.strokeColor = originalColor;
          this.originalColors.delete(result.index);
          this.selectedId = null;
          shouldShowSidebar = false;
        } else {
          this.existingShapes.forEach((shape, index) => {
            if (index !== result.index && this.originalColors.has(index)) {
              const prevOriginalColor =
                this.originalColors.get(index) || this.strokeColor!;
              shape.strokeColor = prevOriginalColor;
              this.originalColors.delete(index);
            }
          });

          if (!this.originalColors.has(result.index)) {
            this.originalColors.set(result.index, result.item.strokeColor);
          }

          result.item.strokeColor = "red";
          this.selectedId = result.index;
          shouldShowSidebar = true;
        }
      } else {
        this.existingShapes.forEach((shape, index) => {
          if (this.originalColors.has(index)) {
            const originalColor =
              this.originalColors.get(index) || this.strokeColor!;
            shape.strokeColor = originalColor;
          }
        });
        this.originalColors.clear();
        this.selectedId = null;
        shouldShowSidebar = false;
      }

      this.setSideBar(shouldShowSidebar);
      this.renderAllShapes(this.textBoxes);
    }

    if (this.selectedTools === "text") {
      this.setActiveInput({ x: this.startX, y: this.startY, text: "" });
    }
  };

  private drawSquare = (shape?: {
    x: number;
    y: number;
    w: number;
    h: number;
  }) => {
    let x = shape ? shape.x : this.startX;
    let y = shape ? shape.y : this.startY;
    let w = shape ? shape.w : this.currentX - this.startX;
    let h = shape ? shape.h : this.currentY - this.startY;

    this.context.rect(x, y, w, h);
  };

  private drawCircle = (shape?: { x: number; y: number; r: number }) => {
    let x = shape ? shape.x : this.startX;
    let y = shape ? shape.y : this.startY;
    let r = shape
      ? shape.r
      : Math.sqrt(
          (this.currentX - this.startX) ** 2 +
            (this.currentY - this.startY) ** 2
        );
    this.context.arc(x, y, r, 0, Math.PI * 2, false);
  };

  private drawLine = (shape?: {
    x: number;
    y: number;
    cx: number;
    cY: number;
  }) => {
    let x = shape ? shape.x : this.startX;
    let y = shape ? shape.y : this.startY;
    let cx = shape ? shape.cx : this.currentX;
    let cY = shape ? shape.cY : this.currentY;

    this.context.moveTo(x, y);
    this.context.lineTo(cx, cY);
  };

  private drawTriangle = (shape?: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    x3: number;
    y3: number;
  }) => {
    if (!shape) {
      const x1 = this.startX;
      const y1 = this.startY;
      const x2 = this.currentX;
      const y2 = this.currentY;
      const x3 = x1 * 2 - x2;
      const y3 = y2;

      this.context.moveTo(x1, y1);
      this.context.lineTo(x2, y2);
      this.context.lineTo(x3, y3);
      this.context.closePath();
    } else {
      this.context.moveTo(shape.x1, shape.y1);
      this.context.lineTo(shape.x2, shape.y2);
      this.context.lineTo(shape.x3, shape.y3);
      this.context.closePath();
    }
  };

  public undoLastShape = () => {
    if (this.existingShapes.length === 0) return;
    let last = this.existingShapes.pop()!;
    this.undoShapes.push(last);

    if (this.selectedId === this.existingShapes.length) {
      this.selectedId = null;
      this.originalColors.clear();
    }

    this.renderAllShapes(this.textBoxes);
  };

  public redoLastShape = () => {
    if (this.undoShapes.length === 0) return;
    const last = this.undoShapes.pop()!;
    this.existingShapes.push(last);
    this.renderAllShapes(this.textBoxes);
  };

  public downloadImage = () => {
    const image = this.canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "drawing.png";
    link.click();
  };
}
