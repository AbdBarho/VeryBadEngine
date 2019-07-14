import Layer from "./Layer";
import Canvas from "../Canvas";

export default class GUILayer extends Layer {

  constructor(canvas: Canvas, index: number) {
    super(canvas, index);
    this.frame.id = "GUILayer_" + index;
  }

  clearAndFillRect(x: number, y: number, w: number, h: number, color: string) {
    console.log("rendering", arguments)
    x *= this.xScale;
    y *= this.yScale;
    h *= this.yScale;
    w *= this.xScale;
    this.ctx.clearRect(x, y, w, h);
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, w, h);
  }

  fillText(text: string, x: number, y: number, font: string, color: string, alignment: CanvasTextAlign, baseLine: CanvasTextBaseline, stroke: string = color) {
    this.ctx.font = font;
    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = stroke;
    this.ctx.textAlign = alignment;
    this.ctx.textBaseline = baseLine;
    this.ctx.fillText(text, x * this.xScale, y * this.yScale);

  }
}
