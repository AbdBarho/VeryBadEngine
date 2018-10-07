import initConfig from "../config/initconfig";
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
    scale: new Vector(2),
    shift: new Vector(2),
    size: new Vector(2),
    baseSize: new Vector(initConfig.CANVAS.BASE_SIZE.slice()),
    aspectRatio: initConfig.CANVAS.ASPECT_RATIO
  };

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
    let rect = this.canvas.getBoundingClientRect();
    this.config.shift.setArr([rect.left, rect.top]);
  }


  pixelToUnit(x: number, y: number) {
    let pos = new Vector([x, y]);
    pos.subVec(this.config.shift).divVec(this.config.scale).floor();
    return pos;
  }
}