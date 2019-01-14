import Vector from "../math/Vector";
import Vec2 from "../math/vector/Vec2";
import EventManager from "../services/EventManager";
import Layer from "./Layer";

export default class Canvas extends EventManager {
  layers: Layer[] = [];
  scale = Vector.create();
  shift = Vector.create();
  size = Vector.create();
  baseSize: Vec2;
  aspectRatio: number;

  constructor(width: number, height: number) {
    super();
    this.baseSize = Vector.create(width, height);
    this.aspectRatio = width / height;
    window.addEventListener("resize", () => requestAnimationFrame(() => this.fitToParent()));
  }

  getLayer(index: number) {
    return this.layers[index] || this.createLayer(index);
  }

  private createLayer(index: number) {
    let layer = new Layer(index);
    let len = this.layers.length;
    if (index > len) {
      let i = len;
      while (index > len) {
        this.layers.push(new Layer(i));
      }
    }
    this.layers.splice(index, 0, layer);
    this.fitToParent();
    return layer;
  }

  private fitToParent() {
    if (!this.layers.length)
      return;

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
    this.size.set(width, height);
    this.scale = Vector.copy(this.size).divVec(this.baseSize);
    let [xScale, yScale] = this.scale.copyValues();
    let leftShift = (parentWidth - width) / 2;
    let topShift = (parentHeight - height) / 2;
    this.shift.set(leftShift, topShift);
    for (let layer of this.layers) {
      document.body.appendChild(layer.getCanvas());
      layer.setDimensions(width, height, leftShift, topShift, xScale, yScale);
    }
    this.trigger("resize", this.size);
  }

  pixelToUnit(x: number, y: number, target: Vec2) {
    target.set(x, y).subVec(this.shift).divVec(this.scale).trunc();
  }

  onResize(callback: (...args: any[]) => any, context: any) {
    this.on("resize", callback, context);
  }

  offResize(callback: (...args: any[]) => any) {
    this.off("resize", callback);
  }
}
