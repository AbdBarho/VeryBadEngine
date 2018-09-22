import Logger from "../services/logger";
import EventManager from "../services/eventmanager";
import Confing from "../config/config";
import Vector from "../math/vector";

const CONFIG = Confing.getConfig("VIEWPORT");
const SIZE = CONFIG.SIZE;
const BASE_WIDTH = SIZE.get(0);
const BASE_HEIGHT = SIZE.get(1);
const ASPECT_RATIO = CONFIG.ASPECT_RATIO;

export default class ResizableCanvas {
  constructor() {
    this.logger = new Logger(this, "Canvas");
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.parameters = {
      scale: null,
      shift: null,
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
    let scale = new Vector([this.canvas.width / BASE_WIDTH, this.canvas.height / BASE_HEIGHT]);
    let rect = this.canvas.getBoundingClientRect();
    let shift = new Vector([rect.x, rect.y]);
    Object.assign(this.parameters, { scale, shift });
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