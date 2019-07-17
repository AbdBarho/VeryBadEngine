import Canvas from "../Canvas";
import { V2 } from "../../../math/vector/VectorTypes";

export default class Layer {
  canvas: Canvas;
  frame = document.createElement("canvas");
  private isTransferred = false;
  private size: V2 = { x: 0, y: 0 };

  constructor(canvas: Canvas) {
    this.canvas = canvas;
  }

  getFrame() {
    return this.frame;
  }

  getSize() {
    return this.size;
  }

  transferToOffscreen() {
    this.isTransferred = true;
    return this.frame.transferControlToOffscreen();
  }

  setDimensions(w: number, h: number, left: number, top: number) {
    this.size.x = w;
    this.size.y = h;
    if (!this.isTransferred) {
      this.frame.width = w;
      this.frame.height = h;
    }
    this.frame.style.top = top + "px";
    this.frame.style.left = left + "px";
  }
}
