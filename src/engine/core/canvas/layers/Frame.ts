import Config from "../../../config/Config";

export type DrawableImage = HTMLCanvasElement | HTMLImageElement | SVGImageElement | ImageBitmap | OffscreenCanvas;
export type FillStyle = string | CanvasGradient | CanvasPattern;

export type GradientData = {
  points: [number, number, number, number];
  stops: number[];
  colors: string[];
}

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
    // if (this.ctx.fillStyle === fill)
    //   return;
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

  renderGradientData(data: GradientData) {
    const gradient = this.ctx.createLinearGradient(...data.points);
    for (let i = 0; i < data.stops.length; i++)
      gradient.addColorStop(data.stops[i], data.colors[i]);
    this.fillStyle(gradient);
    this.fillFrame();
  }

  drawImage(image: DrawableImage, x: number, y: number, w: number, h: number) {
    this.ctx.drawImage(image, x, y, w, h);
  }

  drawSprite(sprite: DrawableImage,
    sourceX: number, sourceY: number, sourceW: number, sourceH: number,
    x: number, y: number, w: number, h: number) {
    this.ctx.drawImage(sprite, sourceX, sourceY, sourceW, sourceH, x, y, w, h);
  }

  fillFrame() {
    this.ctx.fillRect(0, 0, WIDTH, HEIGHT);
  }

  fillRect(x: number, y: number, w: number, h: number, color: string) {
    this.fillStyle(color);
    this.ctx.fillRect(x | 0, y | 0, w | 0, h | 0);
  }

  fillCircle(cx: number, cy: number, radius: number, color: string) {
    this.fillStyle(color);
    this.ctx.beginPath();
    this.ctx.ellipse(cx, cy, radius, radius, 0, 0, FULL_CIRCLE);
    this.ctx.fill();
    this.ctx.closePath();
  }

  fillStar(cx: number, cy: number, numSpikes: number, minRadius: number, maxRadius: number, fillStyle: string) {
    this.fillStyle(fillStyle);
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
