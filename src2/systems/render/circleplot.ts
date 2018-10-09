import System from "../../ecs/system/system";
import Canvas from "../../engine/canvas";

//always bottom right
const radius = 100;
const diameter = radius * 2;

export default class CirclePlot extends System {
  canvas: Canvas;
  constructor(canvas: Canvas) {
    super(["debugCirclePoint"]);
    this.canvas = canvas;
  }

  updateEntity(entity: any) {
    let starty = this.canvas.config.size.get(1) - diameter;
    let ctx = this.canvas.ctx;
    ctx.fillStyle = "white";
    ctx.fillRect(0, starty, diameter, diameter);
    ctx.beginPath();
    ctx.arc(radius, starty + radius, radius, 0, 2 * Math.PI);
    ctx.stroke();

    let x = entity.debugCirclePoint[0] * radius + radius;
    let y = entity.debugCirclePoint[1] * radius + radius +starty;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
  }
}