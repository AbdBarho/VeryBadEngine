import Canvas from "../Canvas";
import { V2 } from "../../../math/VectorTypes";

export default class Layer {
  canvas: Canvas;
  frame = document.createElement("canvas");
  private isTransferred = false;

  constructor(canvas: Canvas) {
    this.canvas = canvas;
  }

  getFrame() {
    return this.frame;
  }

  transferToOffscreen() {
    this.isTransferred = true;
    return this.frame.transferControlToOffscreen();
  }

  setDimensions(size: V2, shift: V2) {
    if (!this.isTransferred) {
      this.frame.width = size.x;
      this.frame.height = size.y;
    }
    this.frame.style.top = shift.y + "px";
    this.frame.style.left = shift.x + "px";
  }
}
