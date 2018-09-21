import Vector from "../../services/math/vector";

export default class StaticObject {
  constructor(numDimensions) {
    this.pos = new Vector(numDimensions);
  }

  /**
   * @param {Vector} pos
   */
  setPosition(pos) {
    this.pos = pos;
  }

  getBoundingBox() {
    throw "not implemented";
  }

  getRenderingCommand() {
    throw "not implemented";
  }

  destroy() {
    throw "not implemented";
  }
}