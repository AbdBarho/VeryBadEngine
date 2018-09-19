import Logger from "../services/logger";
import EventManager from "../services/eventmanager";

const ASPECT_RATIO = 16 / 9;
const BASE_WIDTH = 1920;
const BASE_HEIGHT = 1080;

export default class ResizableCanvas {
  constructor() {
    this.logger = new Logger(this, "Canvas");
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.parameters = {
      scale: 1,
      xShift: 0,
      yShift: 0,
      width: 0,
      height: 0,
      baseWidth: BASE_WIDTH,
      baseHeight: BASE_HEIGHT
    };

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
    this.parameters.width = width;
    this.parameters.height = height;
  }

  calculateParameters() {
    let scale = this.canvas.width / BASE_WIDTH;
    let rect = this.canvas.getBoundingClientRect();
    let xShift = rect.x;
    let yShift = rect.y;
    Object.assign(this.parameters, { scale, xShift, yShift });
  }

  getParamaters() {
    return Object.assign({}, this.parameters);
  }

  getCanvas() {
    return this.canvas;
  }

  getContext() {
    return this.ctx;
  }
}