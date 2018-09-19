import ResizableCanvas from "./resizablecanvas";
import Container from "../services/container";
import Vector from "../services/math/vector";

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
  pixelToUnit(x, y) {
    x -= this.parameters.xShift;
    x /= this.parameters.scale;

    y -= this.parameters.yShift;
    y /= this.parameters.scale;

    return { x, y };
  }

  unitToPixel(...coords) {
    return coords.map(x => x * this.parameters.scale);
  }


  backgroundColor(color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.parameters.width, this.parameters.height);
  }

  /**
   *
   * @param {Vector} vector
   */
  scale(vector) {
    return vector.copy().mulNum(this.parameters.scale).getValues();
  }

  /**
   * @param {Vector} pos
   * @param {Vector} size
   * @param {String} color
   */
  fillRect(pos, size, color) {
    this.ctx.fillStyle = color;
    let params = this.scale(pos).concat(this.scale(size));
    this.ctx.fillRect(...params);
  }
}
