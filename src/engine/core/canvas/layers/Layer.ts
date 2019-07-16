import Canvas from "../Canvas";

export default class Layer {
  canvas: Canvas;
  frame = document.createElement("canvas");
  constructor(canvas: Canvas) {
    this.canvas = canvas;
  }

  getFrame() {
    return this.frame;
  }

  get width() {
    return this.frame.width;
  }

  set width(val) {
    this.frame.width = val;
  }

  get height() {
    return this.frame.height;
  }

  set height(val) {
    this.frame.height = val;
  }

  setDimensions(w: number, h: number, left: number, top: number) {
    // this.width = w;
    // this.height = h;
    this.frame.style.top = top + "px";
    this.frame.style.left = left + "px";
  }
}
