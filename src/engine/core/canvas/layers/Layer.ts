import Canvas from "../Canvas";

export default class Layer {
  canvas: Canvas;
  frame = document.createElement("canvas");
  ctx: CanvasRenderingContext2D;

  constructor(canvas: Canvas) {
    this.canvas = canvas;

    let ctx = this.frame.getContext("2d");
    if (ctx === null)
      throw "No context could be created for the canvas";
    this.ctx = ctx;
  }

  getFrame() {
    return this.frame;
  }

  getContext() {
    return this.ctx;
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
    this.width = w;
    this.height = h;
    this.frame.style.top = top + "px";
    this.frame.style.left = left + "px";
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}
