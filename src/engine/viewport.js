import ResizableCanvas from "./resizablecanvas";
import Container from "../services/container";

export default class Viewport extends ResizableCanvas {
  constructor() {
    super();
    // this.world = Container.getWorld();
    Container.register("Viewport", this);
  }

  /**
   * @param {Number} x
   * @param {Number} y
   * @returns {{x:Number, y: Number}} from pixels in page to game units
   */
  shiftAndScale(x, y) {
    x -= this.parameters.xShift;
    x /= this.parameters.xScale;

    y -= this.parameters.yShift;
    y /= this.parameters.yScale;

    return { x, y };
  }

  unshiftAndUnscale(x, y) {
    x *= this.parameters.xScale;
    // x += this.parameters.xShift;

    // y += this.parameters.yShift;
    y *= this.parameters.yScale;

    return {
      x,
      y
    };

  }


  backgroundColor(color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.parameters.width, this.parameters.height);
  }
}
