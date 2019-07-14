import Vector from "../../math/Vector";
import Vec2 from "../../math/vector/Vec2";
import EventManager from "../../services/Eventmanager";
import Logger from "../../services/Logger";
import Layer from "./layers/Layer";
import GUILayer from "./layers/GUILayer";

type LAYER_TYPES = "Layer" | "GUILayer";
const LAYERS = { Layer, GUILayer };

export default class Canvas extends EventManager {
  layers: Layer[] = [];
  guiLayers: GUILayer[] = [];
  scale = Vector.create();
  shift = Vector.create();
  size = Vector.create();
  baseSize: Vec2;
  aspectRatio: number;

  constructor(width: number, height: number) {
    super();
    this.baseSize = Vector.create(width, height);
    this.aspectRatio = width / height;
    //FIXME: not here
    window.addEventListener("resize", () => requestAnimationFrame(() => this.fitToParent()));
  }

  getLayer(index: number) {
    return this.layers[index] || this.createLayer(index);
  }

  getGUILayer(index: number) {
    return this.guiLayers[index] || this.createGUILayer(index);
  }

  getShift() {
    return this.shift;
  }

  private createLayer(index: number) {
    return this.create(index, this.layers, "Layer");
  }

  private createGUILayer(index: number) {
    return this.create(index, this.guiLayers, "GUILayer");
  }

  private create(index: number, layers: Layer[], type: LAYER_TYPES) {
    let LayerClass = LAYERS[type];
    let layer = new LayerClass(this, index);
    let len = layers.length;
    while (index > len) {
      layers.push(new LayerClass(this, len++));
    }
    layers.splice(index, 0, layer);
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
    let [xScale, yScale] = this.scale.copyValues();
    let leftShift = (parentWidth - width) / 2;
    let topShift = (parentHeight - height) / 2;
    this.shift.set(leftShift, topShift);
    for (let layer of this.layers.concat(this.guiLayers)) {
      document.body.appendChild(layer.getFrame());
      layer.setDimensions(width, height, leftShift, topShift, xScale, yScale);
    }
    this.trigger("resize", this.size);
  }

  private addLayerToPage(layer: Layer) {

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
