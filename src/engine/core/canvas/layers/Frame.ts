import Config from "../../../config/Config";

export type DrawableImage = HTMLCanvasElement | HTMLImageElement | SVGImageElement | ImageBitmap | OffscreenCanvas;
export type FillStyle = string | CanvasGradient | CanvasPattern;

const FULL_CIRCLE = Math.PI * 2;
const { WIDTH, HEIGHT } = Config.CANVAS;

export default class Frame {

  buffer = new OffscreenCanvas(WIDTH, HEIGHT);
  ctx: OffscreenCanvasRenderingContext2D;
  width = WIDTH;
  height = HEIGHT;

  constructor() {
    let ctx = this.buffer.getContext("2d");
    if (ctx === null)
      throw "No context could be created for the off screen canvas";
    this.ctx = ctx as OffscreenCanvasRenderingContext2D;
  }

  getBuffer() {
    return this.buffer;
  }

  getContext() {
    return this.ctx;
  }

  clear() {
    this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
  }

  alpha(val: number) {
    this.ctx.globalAlpha = val;
  }

  fillStyle(fill: FillStyle) {
    this.ctx.fillStyle = fill;
  }

  debugPoint(cx: number, cy: number, radius: number, fill: string) {
    this.ctx.fillStyle = fill;
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();
  }


  backgroundSolidColor(color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, WIDTH, HEIGHT);
  }

  createLinGrad(x1: number, y1: number, x2: number, y2: number) {
    return this.ctx.createLinearGradient(x1, y1, x2, y2);
  }

  drawImage(image: DrawableImage, x: number, y: number, w: number, h: number) {
    this.ctx.drawImage(image, x, y, w, h);
  }

  fillFrame() {
    this.ctx.fillRect(0, 0, WIDTH, HEIGHT);
  }

  fillRectCompact(dims: number[], color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(dims[0], dims[1], dims[2], dims[3]);
  }

  fillCircle(cx: number, cy: number, radius: number, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.ellipse(cx, cy, radius, radius, 0, 0, FULL_CIRCLE);
    this.ctx.fill();
    this.ctx.closePath();
  }

  fillStar(cx: number, cy: number, numSpikes: number, minRadius: number, maxRadius: number, fillStyle: string) {
    this.ctx.fillStyle = fillStyle;
    this.ctx.beginPath();
    this.ctx.translate(cx, cy);
    this.ctx.moveTo(0, 0 - minRadius);
    let angle = Math.PI / numSpikes;
    let outerRadius = 0 - maxRadius;
    let innerRadius = 0 - minRadius;
    for (let i = 0; i < numSpikes; i++) {
      this.ctx.rotate(angle);
      this.ctx.lineTo(0, outerRadius);
      this.ctx.rotate(angle);
      this.ctx.lineTo(0, innerRadius);
    }
    this.ctx.closePath();
    this.ctx.fill();
  }

  rotate(angle: number, cx = 0, cy = 0) {
    this.ctx.translate(cx, cy);
    this.ctx.rotate(angle);
    this.ctx.translate(-cx, -cy);
  }

  resetRotation() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}
