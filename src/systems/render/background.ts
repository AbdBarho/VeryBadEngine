import UI from "../../core/canvas";
import EmptySystem from "../../ecs/system/emptySystem";

export default class BackgroundColor extends EmptySystem {
  ui: UI;
  color: string;
  constructor(color: string, ui: UI) {
    super();
    this.color = color;
    this.ui = ui;
  }

  update() {
    this.ui.ctx.fillStyle = this.color;
    this.ui.ctx.fillRect(0, 0, this.ui.canvas.width, this.ui.canvas.height);
  }
}
