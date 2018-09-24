import Logger from "../services/logger";
import EventManager from "../services/eventmanager";
import Confing from "../config/config";
import Vector from "../math/vector";

const CONFIG = Confing.getConfig("CANVAS");
const SIZE: Vector = CONFIG.SIZE;
const ASPECT_RATIO = CONFIG.ASPECT_RATIO;

export interface CanvasParameters {
  SCALE: Vector,
  SHIFT: Vector,
  SIZE: Vector,
  BASE_SIZE: Vector,
  ASPECT_RATIO: number,
}

export default class ResizableCanvas {
  logger = new Logger(this, "Canvas");
  canvas = document.createElement("canvas");
  ctx: CanvasRenderingContext2D;
  parameters: CanvasParameters;

  constructor(parameters: CanvasParameters = CONFIG) {
    let ctx = this.canvas.getContext("2d");
    if (ctx === null) {
      throw "No context could be created for the canvas";
    }
    this.ctx = ctx;
    this.parameters = parameters;
    document.body.appendChild(this.canvas);
    window.addEventListener("resize", () => this.update());
    this.update();
  }

  update() {
    this.resize();
    this.calculateParameters();
    EventManager.trigger("canvas", this.getParamaters());
    Logger.debugInfo(this.parameters);
  }

  resize() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let min = Math.min(width, height);
    if (min === width) {
      height = Math.min(height, Math.floor(width / ASPECT_RATIO));
      width = Math.floor(height * ASPECT_RATIO);
    } else {
      width = Math.min(width, Math.floor(height * ASPECT_RATIO));
      height = Math.floor(width / ASPECT_RATIO);
    }
    this.canvas.width = width;
    this.canvas.height = height;
    this.parameters.SIZE = new Vector([width, height]);
  }

  calculateParameters() {
    this.parameters.SCALE = this.parameters.SIZE.copy().divVec(this.parameters.BASE_SIZE);
    let rect = this.canvas.getBoundingClientRect();
    this.parameters.SHIFT = new Vector([rect.left, rect.top]);
  }

  getParamaters() {
    return Object.assign({}, this.parameters);
  }

  getContext() {
    return this.ctx;
  }
}