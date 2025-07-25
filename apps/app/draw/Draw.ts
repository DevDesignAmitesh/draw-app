import {
  FormDataTypes,
  getSelectedShapeDistance,
  selectedTools,
  Shapes,
} from "@/lib/utils";
import { getAllShapes } from "./client-http";
import { v4 as uuidv4 } from "uuid";
import { OthersMap } from "@/components/MainCanvas";

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
  private originalText: Map<number, string> = new Map();
  private originalStroke: Map<number, string> = new Map();
  private setDetails: React.Dispatch<React.SetStateAction<FormDataTypes>>;
  private setSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  private setOthers: React.Dispatch<React.SetStateAction<OthersMap>>;

  private opacity: number;
  private fillColor: string | null;
  private textColor: string | null;
  private bgColor: string | null;
  private userId: string;
  public setActiveInput: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
      text: string;
    } | null>
  >;

  constructor(
    setOthers: React.Dispatch<React.SetStateAction<OthersMap>>,
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
    >
  ) {
    this.userId = userId;
    this.details = details;
    this.setDetails = setDetails;
    this.setSideBar = setSideBar;
    this.setOthers = setOthers;
    this.setActiveInput = setActiveInput;
    this.strokeColor = theme === "dark" ? "#fff" : "#000";
    this.textColor = theme === "dark" ? "#fff" : "#000";
    this.bgColor = theme === "dark" ? "#121212" : "#fff";
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
    this.loadAllShapes(roomSlug);
    this.webSockerInitHandler();
    this.startHandler();
    this.startCanvasHandler();
  }

  public loadAllShapes = async (slug: string) => {
    try {
      this.existingShapes = await getAllShapes(slug);
      this.existingShapes = this.existingShapes.map((shape) => {
        const updatedShape = {
          ...shape,
          strokeColor:
            shape.strokeColor === "#000" || shape.strokeColor === "#fff"
              ? this.strokeColor!
              : shape.strokeColor!,
          fillColor:
            shape.fillColor === "#121212" || shape.fillColor === "#fff"
              ? this.bgColor!
              : shape.fillColor!,
        };

        // Only update textColor for text shapes
        if (shape.type === "text") {
          return {
            ...updatedShape,
            textColor:
              shape.textColor === "#000" || shape.textColor === "#fff"
                ? this.textColor!
                : shape.textColor,
          };
        }

        return updatedShape;
      });
      this.renderAllShapes();
    } catch (error) {
      console.error("Error loading shapes:", error);
    }
  };

  public webSockerInitHandler = () => {
    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === "send_cursor") {
          console.log("Incoming message:", data);
          this.setOthers((prev) => ({
            ...prev,
            [data.userId]: {
              x: data.x,
              y: data.y,
            },
          }));
        }
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
        this.existingShapes = this.existingShapes.map((shape) => {
          const updatedShape = {
            ...shape,
            strokeColor:
              shape.strokeColor === "#000" || shape.strokeColor === "#fff"
                ? this.strokeColor!
                : shape.strokeColor!,
            fillColor:
              shape.fillColor === "#121212" || shape.fillColor === "#fff"
                ? this.bgColor!
                : shape.fillColor!,
          };

          // Only update textColor for text shapes
          if (shape.type === "text") {
            return {
              ...updatedShape,
              textColor:
                shape.textColor === "#000" || shape.textColor === "#fff"
                  ? this.textColor!
                  : shape.textColor,
            };
          }

          return updatedShape;
        });
        this.renderAllShapes();
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
    this.ws.send(
      JSON.stringify({
        type: "shapes",
        payload: data,
      })
    );
  };

  public changeTheme(theme: string) {
    const themeColor = theme === "dark" ? "#fff" : "#000";
    const themeBgColor = theme === "dark" ? "#121212" : "#fff";

    if (this.strokeColor === "#000" || this.strokeColor === "#fff") {
      this.strokeColor = themeColor;
    }

    if (this.textColor === "#000" || this.textColor === "#fff") {
      this.textColor = themeColor;
    }

    if (this.bgColor === "#121212" || this.bgColor === "#fff") {
      this.bgColor = themeBgColor;
    }

    this.existingShapes.forEach((item, index) => {
      if (item.type === "text") {
        const originalTextColor = item.textColor;
        if (!this.originalText.has(index)) {
          if (originalTextColor === "#000" || originalTextColor === "#fff") {
            item.textColor = this.textColor!;
          }
        }
      } else {
        const originalColor = item.strokeColor;
        if (!this.originalStroke.has(index)) {
          if (originalColor === "#000" || originalColor === "#fff") {
            item.strokeColor = this.strokeColor!;
            item.fillColor = this.bgColor!;
          }
        }
      }
    });

    this.renderAllShapes();
  }

  public changeStyles(data: FormDataTypes) {
    console.log(data);
    if (this.selectedId !== null) {
      let selectedShape = this.existingShapes[this.selectedId];

      const newColor = data.strokeColor ?? selectedShape.strokeColor;
      const newWidth = data.strokeWidth ?? selectedShape.width;
      const newStyle = data.strokeStyle ?? selectedShape.strokeStyle;
      const newOpacity = data.opacity ?? selectedShape.opacity;
      const newBg = data.bgColor ?? selectedShape.fillColor;

      let newTextColor = "";
      if (selectedShape.type === "text") {
        newTextColor = data.textColor ?? selectedShape.textColor;
        selectedShape.textColor = newTextColor;
      }

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

      this.originalStroke.set(this.selectedId, newColor);
      this.originalText.set(this.selectedId, newTextColor);

      selectedShape.strokeColor = "red";

      if (selectedShape.type === "text") {
        selectedShape.textColor = "red";
      }
    }
    this.details = data;

    this.renderAllShapes();
  }

  public renderAllShapes = () => {
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
      } else if (item.type === "text") {
        this.context.fillStyle = item.textColor;
        this.context.font = "24px serif";
        this.context.fillText(item.text, item.x, item.y);
      } else if (item.type === "img") {
        if (!item.img && item.imgSrc) {
          const image = new Image();
          image.crossOrigin = "anonymous";
          image.src = item.imgSrc;
          image.onload = () => {
            item.img = image;
            this.renderAllShapes(); // re-render when image is loaded
          };
          return; // Skip rendering for now
        }

        if (item.img instanceof HTMLImageElement && item.img.complete) {
          this.context.drawImage(
            item.img,
            item.x,
            item.y,
            item.width,
            item.height
          );
        } else {
          console.warn(
            "Image is not a valid HTMLImageElement or not loaded yet",
            item
          );
        }
      }

      if (item.fillColor) {
        this.context.fillStyle = item.fillColor;
        this.context.fill();
      }

      this.context.strokeStyle = item.strokeColor;
      this.context.stroke();

      this.context.closePath();

      this.context.globalAlpha = 1;
    });
  };

  public addingTextInExistingShapes = (input: Shapes) => {
    this.existingShapes.push(input);
    this.sendMessageViaWebSocket(input);
    this.renderAllShapes();
  };

  public addingImageInExistingShapes = (
    img: HTMLImageElement,
    dropX: number,
    dropY: number
  ) => {
    const data: Shapes = {
      id: uuidv4(),
      type: "img",
      x: dropX,
      y: dropY,
      img,
      imgSrc: img.src,
      strokeColor: "",
      opacity: 1,
      width: 200,
      height: 200,
    };

    this.existingShapes.push(data);
    this.sendMessageViaWebSocket({ ...data, img: undefined });
    this.renderAllShapes();
  };

  public changeSelectedTool = (tool: selectedTools) => {
    this.selectedTools = tool;
    this.selectedId = null;
    this.setSideBar(false);
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
    this.ws.onmessage = null;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  private mouseDownHandler = (e: MouseEvent | TouchEvent) => {
    this.isDrawing = true;
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
      console.log("detaisl is running");
      console.log(this.details);
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
    this.renderAllShapes();
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
      this.renderAllShapes();

      const currentOpacity = this.opacity;
      this.context.globalAlpha = currentOpacity;

      this.context.beginPath();

      const currentStrokeStyle = this.strokeStyle;
      const currentStrokeColor = this.strokeColor;
      const currentStrokeWidth = this.strokeWidth;
      const currentBg = this.bgColor;

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
          canvas: this.canvas,
        });

        if (result.distance === 0 && result.index !== null) {
          const last = this.existingShapes[result.index];
          this.existingShapes.splice(result.index, 1);
          this.undoShapes.push(last);
          this.originalStroke.delete(result.index);
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
        this.context.fillStyle = currentBg;
        this.context.fill();
      }

      if (currentStrokeColor) {
        this.context.strokeStyle = currentStrokeColor;
        this.context.stroke();
      }

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
          if (selectedShape.type === "text") {
            selectedShape.x = this.currentX;
            selectedShape.y = this.currentY;
          }
          if (selectedShape.type === "img") {
            selectedShape.x = this.currentX;
            selectedShape.y = this.currentY;
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
        canvas: this.canvas,
      });

      let shouldShowSidebar = false;

      if (result.distance === 0 && result.index !== null) {
        let originalTextColor = "";
        let originalStrokeColor = "";
        if (result.item.type === "text") {
          originalTextColor =
            this.originalText.get(result.index) || result.item.textColor;
        } else {
          originalStrokeColor =
            this.originalStroke.get(result.index) || result.item.strokeColor;
        }

        this.setDetails(() => ({
          strokeColor: originalStrokeColor,
          strokeWidth: result.item.width,
          strokeStyle: result.item.strokeStyle,
          opacity: result.item.opacity,
          bgColor: result.item.fillColor,
          textColor: originalTextColor,
          type: result.item.type,
        }));

        if (this.selectedId === result.index) {
          if (result.item.type === "text") {
            result.item.textColor = originalTextColor;
            this.originalText.delete(result.index);
          } else {
            result.item.strokeColor = originalStrokeColor;
            this.originalStroke.delete(result.index);
          }
          this.selectedId = null;
          shouldShowSidebar = false;
        } else {
          this.existingShapes.forEach((shape, index) => {
            if (shape.type === "text") {
              if (index !== result.index && this.originalText.has(index)) {
                const prevOriginalTextColor =
                  this.originalText.get(index) || this.textColor!;
                shape.textColor = prevOriginalTextColor;
                this.originalText.delete(index);
              }
            } else if (
              index !== result.index &&
              this.originalStroke.has(index)
            ) {
              const prevOriginalColor =
                this.originalStroke.get(index) || this.strokeColor!;
              shape.strokeColor = prevOriginalColor;
              this.originalStroke.delete(index);
            }
          });

          if (
            !this.originalStroke.has(result.index) ||
            !this.originalText.has(result.index)
          ) {
            if (result.item.type === "text") {
              this.originalText.set(result.index, result.item.textColor);
            } else {
              this.originalStroke.set(result.index, result.item.strokeColor);
            }
          }
          if (result.item.type === "text") {
            result.item.textColor = "red";
          } else {
            result.item.strokeColor = "red";
          }

          this.selectedId = result.index;
          shouldShowSidebar = true;
        }
      } else {
        this.existingShapes.forEach((shape, index) => {
          if (shape.type === "text") {
            if (this.originalText.has(index)) {
              const originalTextColor =
                this.originalText.get(index) || this.textColor!;
              shape.textColor = originalTextColor;
            }
          } else if (this.originalStroke.has(index)) {
            const originalStrokeColor =
              this.originalStroke.get(index) || this.strokeColor!;
            shape.strokeColor = originalStrokeColor;
          }
        });
        this.originalStroke.clear();
        this.originalText.clear();
        this.selectedId = null;
        shouldShowSidebar = false;
      }

      this.setSideBar(shouldShowSidebar);
      this.renderAllShapes();
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
      this.originalStroke.clear();
    }

    this.renderAllShapes();
  };

  public redoLastShape = () => {
    if (this.undoShapes.length === 0) return;
    const last = this.undoShapes.pop()!;
    this.existingShapes.push(last);
    this.renderAllShapes();
  };

  public downloadImage = () => {
    const image = this.canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "drawing.png";
    link.click();
  };
}
