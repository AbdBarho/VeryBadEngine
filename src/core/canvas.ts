import Config from "../config/config";
import Vector from "../math/vector";

export interface CanvasConfig {
  scale: Vector,
  shift: Vector,
  size: Vector,
  baseSize: Vector,
  aspectRatio: number,
}

export default class Canvas {
  canvas = document.createElement("canvas");
  ctx: CanvasRenderingContext2D;
  config: CanvasConfig = {
    scale: Vector.create(2),
    shift: Vector.create(2),
    size: Vector.create(2),
    baseSize: Vector.create(Config.CANVAS.BASE_SIZE.slice()),
    aspectRatio: Config.CANVAS.ASPECT_RATIO
  };
  xScale = 0;
  yScale = 0;

  constructor() {
    let ctx = this.canvas.getContext("2d");
    if (ctx === null) {
      throw "No context could be created for the canvas";
    }
    this.ctx = ctx;
    document.body.appendChild(this.canvas);
    window.addEventListener("resize", () => this.fitToScreen());
    this.fitToScreen();
  }

  fitToScreen() {
    this.resize();
    this.calculateParameters();
  }

  resize() {
    let aspectRatio = this.config.aspectRatio;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let min = Math.min(width, height);
    if (min === width) {
      height = Math.min(height, Math.floor(width / aspectRatio));
      width = Math.floor(height * aspectRatio);
    } else {
      width = Math.min(width, Math.floor(height * aspectRatio));
      height = Math.floor(width / aspectRatio);
    }
    this.canvas.width = width;
    this.canvas.height = height;
    this.config.size.setArr([width, height]);
  }

  calculateParameters() {
    this.config.scale = this.config.size.copy().divVec(this.config.baseSize);
    this.xScale = this.config.scale.get(0);
    this.yScale = this.config.scale.get(1);
    let rect = this.canvas.getBoundingClientRect();
    this.config.shift.setArr([rect.left, rect.top]);

  }

  pixelToUnit(x: number, y: number) {
    let pos = Vector.create([x, y]);
    pos.subVec(this.config.shift).divVec(this.config.scale).floor();
    return pos;
  }

  backgroundSolidColor(color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  fillRect(dims: number[], color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(dims[0] * this.xScale, dims[1] * this.yScale, dims[2] * this.xScale, dims[3] * this.yScale);
  }

  fillCircle(cx:number, cy: number, radius: number, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.ellipse(cx * this.xScale, cy * this.yScale, radius * this.xScale, radius * this.yScale, 0, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();
  }
}
