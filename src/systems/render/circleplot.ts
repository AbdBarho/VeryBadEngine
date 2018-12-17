import Canvas from "../../core/canvas";
import System from "../../ecs/system/system";

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
    let startY = this.canvas.size.get(1) - diameter;
    let ctx = this.canvas.ctx;
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
