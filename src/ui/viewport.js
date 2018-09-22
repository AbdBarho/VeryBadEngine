import ResizableCanvas from "./resizablecanvas";
import Vector from "../math/vector";

export default class Viewport extends ResizableCanvas {
  backgroundColor(color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.parameters.width, this.parameters.height);
  }

  /**
   * @param {Vector} vector
   */
  scale(vector) {
    return vector.mulVec(this.parameters.scale).getValues();
  }

  fillRect(command) {
    this.ctx.fillStyle = command.color;
    this.ctx.fillRect(...this.scale(command.pos), ...this.scale(command.size));
  }
}
