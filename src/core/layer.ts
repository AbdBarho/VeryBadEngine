type DrawableImage = HTMLCanvasElement | HTMLImageElement | SVGImageElement | ImageBitmap;

const FULL_CIRCLE = Math.PI * 2;
export default class Layer {
  canvas = document.createElement("canvas");
  ctx: CanvasRenderingContext2D;
  index: number;
  xScale = 0;
  yScale = 0;
  width = 0;
  height = 0;
  constructor(index: number) {
    this.index = index;
    let ctx = this.canvas.getContext("2d");
    if (ctx === null)
      throw "No context could be created for the canvas";
    this.ctx = ctx;
  }

  getCanvas() {
    return this.canvas;
  }

  getContext() {
    return this.ctx;
  }

  getIndex() {
    return this.index;
  }

  setDimensions(w: number, h: number, left: number, top: number, xScale: number, yScale: number) {
    this.canvas.width = w;
    this.canvas.height = h;
    this.width = w;
    this.height = h;
    this.canvas.style.top = top + "px";
    this.canvas.style.left = left + "px";
    this.xScale = xScale;
    this.yScale = yScale;
  }

  alpha(val: number) {
    this.ctx.globalAlpha = val;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  backgroundSolidColor(color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  drawImage(image: DrawableImage, x: number, y: number, w: number, h: number) {
    this.ctx.drawImage(image, x * this.xScale, y * this.yScale, w * this.xScale, h * this.yScale);
  }

  fillImage(image: DrawableImage) {
    this.ctx.drawImage(image, 0, 0, this.width, this.height);
  }

  fillRect(dims: number[], color: string) {
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
    return this.canvas.toDataURL(type);
  }
}
