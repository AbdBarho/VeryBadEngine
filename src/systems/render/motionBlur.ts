import EmptySystem from "../../ecs/system/emptySystem";
import Canvas from "../../core/canvas";

export default class MotionBlur extends EmptySystem {
  canvas: Canvas;
  cache: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  alpha = 0.7;
  constructor(canvas: Canvas) {
    super();
    this.canvas = canvas;
    this.cache = document.createElement("canvas");
    this.cache.width = this.canvas.canvas.width;
    this.cache.height = this.canvas.canvas.height;
    let ctx = this.cache.getContext("2d");
    if (ctx === null)
      throw "Could not create 2D context for the cached canvas of Motion Blur"
    this.ctx = ctx;
  }

  update() {
    this.drawFrame();
  }

  drawFrame() {
    this.canvas.alpha(this.alpha);
    this.canvas.fillImage(this.cache);
    this.canvas.alpha(1);
    this.ctx.drawImage(this.canvas.canvas, 0, 0);
  }

  doNothing(){
    //doNothing
  }

  disable() {
    this.update = this.doNothing;
    this.ctx.clearRect(0, 0, this.cache.width, this.cache.height);
  }

  enable() {
    this.update = this.drawFrame;
  }

}
