import Canvas from "../../core/canvas";
import System from "../../ecs/system/system";
import Layer from "../../core/layer";

//always bottom right
const radius = 100;
const diameter = radius * 2;

export default class CirclePlot extends System {
  canvas: Canvas;
  layer: Layer;
  constructor(canvas: Canvas) {
    super(["debugCirclePoint"]);
    this.canvas = canvas;
    this.layer = canvas.getLayer(5);
  }

  updateEntity(entity: any) {
    let startY = this.canvas.size.get(1) - diameter;
    let ctx = this.layer.ctx;
    ctx.fillStyle = "white";
    ctx.fillRect(0, startY, diameter, diameter);
    ctx.beginPath();
    ctx.arc(radius, startY + radius, radius, 0, 2 * Math.PI);
    ctx.stroke();

    let x = entity.debugCirclePoint[0] * radius + radius;
    let y = entity.debugCirclePoint[1] * radius + radius +startY;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
  }
}
