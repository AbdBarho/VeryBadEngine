import EmptySystem from "../../ecs/system/emptySystem";
import Canvas from "../../core/canvas";

export default class LastFrameCache extends EmptySystem {
  canvas: Canvas;
  cache: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  constructor(canvas: Canvas) {
    super();
    this.canvas = canvas;
    this.cache = document.createElement("canvas");
    this.setSize();
    let ctx = this.cache.getContext("2d");
    if (ctx === null)
      throw "Could not create 2D context";
    this.ctx = ctx;
  }

  getCachedFrame() {
    return this.cache;
  }

  init() {
    this.canvas.onResize(this.setSize, this);
  }

  setSize() {
    this.cache.width = this.canvas.canvas.width;
    this.cache.height = this.canvas.canvas.height;
  }

  update() {
    this.ctx.drawImage(this.canvas.canvas, 0, 0);
  }

  destroy() {
    this.canvas.offResize(this.setSize);
  }
}
