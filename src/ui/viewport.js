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
    return vector.mulNum(this.parameters.scale).getValues();
  }

  fillRect(color, dims) {
    this.ctx.fillStyle = color;
    dims = this.scale(new Vector(dims));
    this.ctx.fillRect(...dims);
  }
}
