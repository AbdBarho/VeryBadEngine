import Canvas from "../../core/canvas";
import EmptySystem from "../../ecs/system/emptySystem";

export default class BackgroundColor extends EmptySystem {
  canvas: Canvas;
  color: string;
  constructor(color: string, canvas: Canvas) {
    super();
    this.color = color;
    this.canvas = canvas;
  }

  init() {
    document.body.style.backgroundColor = this.color;
  }

  update() {
    this.canvas.backgroundSolidColor(this.color);
  }

  destroy() {
    document.body.style.backgroundColor = "";
  }
}
