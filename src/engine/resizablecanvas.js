import Logger from "../services/logger";
import EventManager from "../services/eventmanager";

const ASPECT_RATIO = 16 / 9;
const BASE_WIDTH = 1920;
const BASE_HEIGHT = 1080;

/**
 * Events:
 * 
 * parametersChanged: {
    xScale,
    yScale,
    xShift,
    yShift
 * }
 */
export default class ResizableCanvas extends EventManager {
  constructor() {
    super();
    this.logger = new Logger(this, "Canvas");
    this.canvas = document.createElement("canvas");
    this.parameters = {
      xScale: 1,
      yScale: 1,
      xShift: 0,
      yShift: 0
    };

    document.body.appendChild(this.canvas);
    window.addEventListener("resize", () => this.update());
    this.update();
  }

  update() {
    this.resize();
    this.calculateParameters();
    let ctx = this.getContext();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
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
  }

  calculateParameters() {
    let xScale = this.canvas.width / BASE_WIDTH;
    let yScale = this.canvas.height / BASE_HEIGHT;
    let style = this.canvas.getBoundingClientRect();
    let xShift = style.x;
    let yShift = style.y;
    this.parameters = {
      xScale,
      yScale,
      xShift,
      yShift
    };

    Logger.debugInfo("xScale", xScale);
    Logger.debugInfo("yScale", yScale);
    Logger.debugInfo("xShift", xShift);
    Logger.debugInfo("yShift", yShift);

    this.trigger("parametersChanged", this.getParamaters());
  }

  getParamaters() {
    return Object.assign({}, this.parameters);
  }

  getCanvas() {
    return this.canvas;
  }

  getContext() {
    return this.canvas.getContext("2d");
  }
}
