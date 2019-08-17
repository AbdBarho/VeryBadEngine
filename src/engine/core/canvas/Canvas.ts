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
  baseSize: V2 = { x: WIDTH, y: HEIGHT };
  aspectRatio: number = WIDTH / HEIGHT;

  resize() {
    this.fitToParent(false);
  }

  getSize() {
    return this.size;
  }

  getLayer(index: number) {
    return this.layers[index] || this.create(index);
  }

  private create(index: number) {
    let layer = new Layer(this);
    while (index > this.layers.length) {
      const layer = new Layer(this);
      layer.setDimensions(this.size, this.shift);
      this.layers.push(layer);
    }
    this.layers.splice(index, 0, layer);
    this.fitToParent(true);
    return layer;

  }

  private fitToParent(newLayer: boolean) {
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

    const shiftX = Math.trunc((parentWidth - width) / 2)
    const shiftY = Math.trunc((parentHeight - height) / 2);
    const same =
      width === this.size.x && height === this.size.y &&
      shiftX === this.shift.x && shiftY === this.shift.y;

    if (same && !newLayer)
      return;

    if (newLayer) {
      let i = 0;
      for (const layer of this.layers) {
        const frame = layer.getFrame();
        frame.id = "frame_" + (i++);
        document.body.appendChild(frame);
      }
    }
    if (!same) {
      Logger.debugState({ width, height });

      this.size.x = width;
      this.size.y = height;

      this.scale = {
        x: this.size.x / this.baseSize.x,
        y: this.size.y / this.baseSize.y
      };

      this.shift.x = shiftX;
      this.shift.y = shiftY;

      for (const layer of this.layers)
        layer.setDimensions(this.size, this.shift);
      this.trigger("resize", this.size);
    }
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
