import System from "../ecs/system/system";
import UI from "../engine/canvas";

export default class BackgroundRenderer extends System {
  ui: UI;
  constructor(ui: UI) {
    super([]);
    this.ui = ui;
  }

  update() {
    this.ui.ctx.fillStyle = "black";
    this.ui.ctx.fillRect(0, 0, this.ui.canvas.width, this.ui.canvas.height);
  }
}