import Canvas from "../Canvas";

export type DrawableImage = HTMLCanvasElement | HTMLImageElement | SVGImageElement | ImageBitmap;
export type FillStyle = string | CanvasGradient | CanvasPattern;

const FULL_CIRCLE = Math.PI * 2;

export default class Layer {
  canvas: Canvas;
  frame = document.createElement("canvas");
  ctx: CanvasRenderingContext2D;
  index: number;
  xScale = 0;
  yScale = 0;
  width = 0;
  height = 0;
  constructor(canvas: Canvas, index: number) {
    this.canvas = canvas;
    this.index = index;
    this.frame.id = "layer_" + index;
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

  getIndex() {
    return this.index;
  }

  setDimensions(w: number, h: number, left: number, top: number, xScale: number, yScale: number) {
    this.frame.width = w;
    this.frame.height = h;
    this.width = w;
    this.height = h;
    this.frame.style.top = top + "px";
    this.frame.style.left = left + "px";
    this.xScale = xScale;
    this.yScale = yScale;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
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
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  createLinGrad(x1: number, y1: number, x2: number, y2: number) {
    return this.ctx.createLinearGradient(x1, y1, x2, y2);
  }

  drawImage(image: DrawableImage, x: number, y: number, w: number, h: number) {
    this.ctx.drawImage(image, x * this.xScale, y * this.yScale, w * this.xScale, h * this.yScale);
  }

  fillFrame() {
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  fillRectCompact(dims: number[], color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(dims[0] * this.xScale, dims[1] * this.yScale, dims[2] * this.xScale, dims[3] * this.yScale);
  }

  fillCircle(cx: number, cy: number, radius: number, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.ellipse(cx * this.xScale, cy * this.yScale, radius * this.xScale, radius * this.yScale, 0, 0, FULL_CIRCLE);
    this.ctx.fill();
    this.ctx.closePath();
  }

  fillStar(cx: number, cy: number, numSpikes: number, minRadius: number, maxRadius: number, fillStyle: string) {
    cx *= this.xScale;
    cy *= this.yScale;
    let avg = (this.xScale + this.yScale) / 2;
    minRadius *= avg;
    maxRadius *= avg;
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
    cx *= this.xScale;
    cy *= this.yScale;
    this.ctx.translate(cx, cy);
    this.ctx.rotate(angle);
    this.ctx.translate(-cx, -cy);
  }

  resetRotation() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  getAsDataURL(type?: string) {
    return this.frame.toDataURL(type);
  }
}
