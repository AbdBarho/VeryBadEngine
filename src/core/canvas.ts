import Config from "../config/config";
import Vector from "../math/vector";
import EventManager from "../services/eventManager";
import Layer from "./layer";

export default class Canvas extends EventManager {
  layers: Layer[] = [];
  scale = Vector.create(2);
  shift = Vector.create(2);
  size = Vector.create(2);
  baseSize = Vector.create([Config.CANVAS.WIDTH, Config.CANVAS.HEIGHT]);
  xScale = 0;
  yScale = 0;

  constructor() {
    super();
    window.addEventListener("resize", () => requestAnimationFrame(() => this.fitToScreen()));
  }

  getLayer(index: number) {
    return this.layers[index] || this.createLayer(index);
  }

  private createLayer(index: number) {
    let layer = new Layer();
    while (index > this.layers.length)
      this.layers.push(new Layer());
    this.layers.splice(index, 0, layer);
    this.fitToScreen();
    return layer;
  }

  fitToScreen() {
    if (!this.layers.length)
      return;
    this.orderLayers();
    this.calculateParameters();
    this.setValues();
    this.trigger("resize", this.size);
  }

  private calculateParameters() {
    let aspectRatio = Config.CANVAS.WIDTH / Config.CANVAS.HEIGHT;
    let width = window.innerWidth;
    let height = window.innerHeight;
    if (Math.min(width, height) === width) {
      height = Math.min(height, Math.floor(width / aspectRatio));
      width = Math.floor(height * aspectRatio);
    } else {
      width = Math.min(width, Math.floor(height * aspectRatio));
      height = Math.floor(width / aspectRatio);
    }
    this.size.setArr([width, height]);
    this.scale = this.size.copy().divVec(this.baseSize);
    this.xScale = this.scale.get(0);
    this.yScale = this.scale.get(1);
    this.shift.setArr([(window.innerWidth - width) / 2, (window.innerHeight - height) / 2]);
  }

  private setValues() {
    let w = this.size.get(0),
      h = this.size.get(1),
      left = this.shift.get(0),
      top = this.shift.get(1);
    for (let layer of this.layers)
      layer.setDimensions(w, h, top, left, this.xScale, this.yScale);
  }

  private orderLayers() {
    for (let layer of this.layers)
      document.body.appendChild(layer.getCanvas());
  }

  pixelToUnit(x: number, y: number) {
    let pos = Vector.create([x, y]);
    pos.subVec(this.shift).divVec(this.scale).floor();
    return pos;
  }

  onResize(callback: (...args: any[]) => any, context: any) {
    this.on("resize", callback, context);
  }

  offResize(callback: (...args: any[]) => any) {
    this.off("resize", callback);
  }
}
