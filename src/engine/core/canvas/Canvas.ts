import CONFIG from "../../config/Config";
import Vector from "../../math/Vector";
import Vec2 from "../../math/vector/Vec2";
import EventManager from "../../services/Eventmanager";
import Logger from "../../services/Logger";
import Layer from "./layers/Layer";
import { V2 } from "../../math/vector/VectorTypes";


const { WIDTH, HEIGHT } = CONFIG.CANVAS;


export default class Canvas extends EventManager {
  layers: Layer[] = [];

  scale = Vector.create();
  shift = Vector.create();
  size = Vector.create();
  baseSize: Vec2;
  aspectRatio: number;

  constructor() {
    super();
    this.baseSize = Vector.create(WIDTH, HEIGHT);
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
    let len = this.layers.length;
    while (index > len) {
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
    this.size.set(width, height);
    this.scale = Vector.copy(this.size).divVec(this.baseSize);

    let leftShift = (parentWidth - width) / 2;
    let topShift = (parentHeight - height) / 2;
    this.shift.set(leftShift, topShift);

    for (let layer of this.layers) {
      layer.setDimensions(width, height, leftShift, topShift);
      document.body.appendChild(layer.getFrame());
    }
    this.trigger("resize", this.size);
  }

  pixelToUnit(x: number, y: number): V2 {
    const vec = new Vec2(x, y).subVec(this.shift).divVec(this.scale).trunc();
    return { x: vec.x, y: vec.y };
  }

  onResize(callback: (...args: any[]) => any, context: any) {
    this.on("resize", callback, context);
  }

  offResize(callback: (...args: any[]) => any) {
    this.off("resize", callback);
  }
}
