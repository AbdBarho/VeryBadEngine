import CONFIG from "../../config/Config";
import EventManager from "../../services/Eventmanager";
import Logger from "../../services/Logger";
import Layer from "./layers/Layer";
import { V2, getV2 } from "../../math/VectorTypes";


const { WIDTH, HEIGHT } = CONFIG.CANVAS;


export default class Canvas extends EventManager {
  layers: Layer[] = [];

  scale = getV2();
  shift = getV2();
  size = getV2();
  baseSize: V2;
  aspectRatio: number;

  constructor() {
    super();
    this.baseSize = { x: WIDTH, y: HEIGHT };
    this.aspectRatio = WIDTH / HEIGHT;
    //FIXME: not here
    window.addEventListener("resize", () => requestAnimationFrame(() => this.fitToParent()));
  }

  getLayer(index: number) {
    return this.layers[index] || this.create(index);
  }

  getShift() {
    return this.shift;
  }

  private create(index: number) {
    let layer = new Layer(this);
    while (index > this.layers.length) {
      this.layers.push(new Layer(this));
    }
    this.layers.splice(index, 0, layer);
    this.fitToParent();
    return layer;

  }

  private fitToParent() {
    let parentWidth = window.innerWidth;
    let parentHeight = window.innerHeight;
    let width, height;
    if (Math.min(parentWidth, parentHeight) === parentWidth) {
      height = Math.trunc(Math.min(parentHeight, parentWidth / this.aspectRatio));
      width = Math.trunc(height * this.aspectRatio);
    } else {
      width = Math.trunc(Math.min(parentWidth, parentHeight * this.aspectRatio));
      height = Math.trunc(width / this.aspectRatio);
    }
    Logger.debugState({ width, height });

    this.size.x = width;
    this.size.y = height;

    this.scale = {
      x: this.size.x / this.baseSize.x,
      y: this.size.y / this.baseSize.y
    };

    this.shift.x = (parentWidth - width) / 2;
    this.shift.y = (parentHeight - height) / 2;

    for (let layer of this.layers) {
      layer.setDimensions(this.size, this.shift);
      document.body.appendChild(layer.getFrame());
    }
    this.trigger("resize", this.size);
  }

  pixelToUnit(x: number, y: number): V2 {
    return {
      x: (x - this.shift.x) / this.scale.x,
      y: (y - this.shift.y) / this.scale.y
    };
  }

  onResize(callback: (...args: any[]) => any, context: any) {
    this.on("resize", callback, context);
  }

  offResize(callback: (...args: any[]) => any) {
    this.off("resize", callback);
  }
}
