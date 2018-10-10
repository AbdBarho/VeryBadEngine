import UI from "../../core/canvas";
import EmptySystem from "../../ecs/system/emptysystem";

export default class BackgroundRenderer extends EmptySystem {
  ui: UI;
  constructor(ui: UI) {
    super();
    this.ui = ui;
  }

  update() {
    this.ui.ctx.fillStyle = "black";
    this.ui.ctx.fillRect(0, 0, this.ui.canvas.width, this.ui.canvas.height);
  }
}