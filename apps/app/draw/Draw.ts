import {
  FormDataTypes,
  getSelectedShapeDistance,
  selectedTools,
  Shapes,
} from "@/lib/utils";

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
  private toolReact: (e: selectedTools) => void;
  public strokeWidth: number;
  public strokeStyle: string;
  public strokeColor: string | null;
  public theme: string | null;

  constructor(
    canvas: HTMLCanvasElement,
    ws: WebSocket,
    roomSlug: string,
    setSelectedTools: React.Dispatch<React.SetStateAction<selectedTools>>
  ) {
    this.theme = null;
    this.strokeColor = null;
    this.strokeWidth = 2;
    this.strokeStyle = "solid";
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
    this.startHandler();
    this.renderAllShapes();
    this.startCanvasHandler();
    this.toolReact = setSelectedTools;
  }

  public changeTheme(theme: string) {
    this.theme = theme;
    this.strokeColor = this.theme === "dark" ? "#fff" : "#000";
    this.renderAllShapes();
  }

  public changeStyles(data: FormDataTypes) {
    this.strokeColor = data.strokeColor ?? this.strokeColor;
    this.strokeWidth = data.strokeWidth ?? this.strokeWidth;
    this.strokeStyle = data.strokeStyle ?? this.strokeStyle;

    if (this.selectedId !== null) {
      const selectedShape = this.existingShapes[this.selectedId];
      selectedShape.strokeColor = this.strokeColor!;
      selectedShape.width = this.strokeWidth;
    }

    this.renderAllShapes();
  }

  public renderAllShapes = () => {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.existingShapes.map((item) => {
      console.log(item);
      this.context.beginPath();
      this.context.strokeStyle = item.strokeColor;
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

      this.context.stroke();
      this.context.closePath();
    });
  };

  public changeSelectedTool = (tool: selectedTools) => {
    this.selectedTools = tool;
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

  private mouseDownHandler = (e: MouseEvent) => {
    this.isDrawing = true;
    let rect = this.canvas.getBoundingClientRect();
    this.startX = e.clientX - rect.left;
    this.startY = e.clientY - rect.top;
  };

  private mouseUpHandler = () => {
    this.isDrawing = false;
    let shape: Shapes;
    if (this.selectedTools === "square") {
      let w = this.currentX - this.startX;
      let h = this.currentY - this.startY;
      shape = {
        type: "square",
        x: this.startX,
        y: this.startY,
        w,
        h,
        width: this.strokeWidth,
        opacity: 100,
        strokeColor: this.strokeColor!,
      };
      this.existingShapes.push(shape);
    }

    if (this.selectedTools === "circle") {
      let r = Math.sqrt(
        (this.currentX - this.startX) ** 2 + (this.currentY - this.startY) ** 2
      );
      shape = {
        type: "circle",
        x: this.startX,
        y: this.startY,
        r,
        width: this.strokeWidth,
        opacity: 100,
        strokeColor: this.strokeColor!,
      };
      this.existingShapes.push(shape);
    }

    if (this.selectedTools === "line") {
      shape = {
        type: "line",
        x: this.startX,
        y: this.startY,
        cx: this.currentX,
        cY: this.currentY,
        width: this.strokeWidth,
        opacity: 100,
        strokeColor: this.strokeColor!,
      };
      this.existingShapes.push(shape);
    }

    if (this.selectedTools === "triangle") {
      const x1 = this.startX;
      const y1 = this.startY;
      const x2 = this.currentX;
      const y2 = this.currentY;
      const x3 = x1 * 2 - x2;
      const y3 = y2;

      const shape: Shapes = {
        type: "triangle",
        x1,
        y1,
        x2,
        y2,
        x3,
        y3,
        width: this.strokeWidth,
        opacity: 100,
        strokeColor: this.strokeColor!,
      };

      this.existingShapes.push(shape);
    }

    this.toolReact("hand");
  };

  private mouseMoveHandler = (e: MouseEvent) => {
    if (this.isDrawing) {
      let rect = this.canvas.getBoundingClientRect();
      this.currentX = e.clientX - rect.left;
      this.currentY = e.clientY - rect.top;

      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.renderAllShapes();

      this.context.beginPath();

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
        const rect = this.canvas.getBoundingClientRect();
        this.currentX = e.clientX - rect.left;
        this.currentY = e.clientY - rect.top;

        const result = getSelectedShapeDistance({
          existingShapes: this.existingShapes,
          currentX: this.currentX,
          currentY: this.currentY,
        });

        if (result.distance === 0 && result.index !== null) {
          const last = this.existingShapes[result.index];
          this.existingShapes.splice(result.index, 1);
          this.undoShapes.push(last);
        }
      }

      this.context.stroke();
      this.context.strokeStyle = this.strokeColor!;
      this.context.lineWidth = this.strokeWidth;
      this.context.closePath();

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
        }
      }
    }
  };

  private mouseClickHandler = (e: MouseEvent) => {
    if (this.selectedTools === "hand") {
      const rect = this.canvas.getBoundingClientRect();
      this.currentX = e.clientX - rect.left;
      this.currentY = e.clientY - rect.top;

      const result = getSelectedShapeDistance({
        existingShapes: this.existingShapes,
        currentX: this.currentX,
        currentY: this.currentY,
      });

      if (result.distance === 0) {
        result.found = true;

        if (this.selectedId === result.index) {
          // Deselect
          result.item.strokeColor = this.strokeColor!;
          this.selectedId = null;
        } else {
          // Deselect others
          this.existingShapes.forEach((shape, index) => {
            if (index !== result.index) shape.strokeColor = this.strokeColor!;
          });
          result.item.strokeColor = "red";
          this.selectedId = result.index;
        }
      }

      if (!result.found) {
        this.existingShapes.forEach((shape) => {
          shape.strokeColor = this.strokeColor!;
        });
        this.selectedId = null;
      }

      this.renderAllShapes();
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
      // If no shape provided, draw based on current mouse positions, e.g., an equilateral triangle or from startX/startY to currentX/currentY
      const x1 = this.startX;
      const y1 = this.startY;
      const x2 = this.currentX;
      const y2 = this.currentY;
      // Calculate third point to form a triangle (for example, an isosceles triangle)
      const x3 = x1 * 2 - x2; // Just a simple example: mirror point
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
