import Vector from "../../math/vector";

export default class StaticObject {
  constructor(params) {
    this.pos = params.POSITION;
    this.size = params.SIZE;
    this.centerShift = params.CENTER_SHIFT;
  }

  /**
   * @param {Vector} pos
   */
  setPosition(pos) {
    this.pos = pos;
  }

  /**
   * @param {Vector} size
   */
  setSize(size) {
    this.size = size;
  }
  

  triggerUpdate(dt) {
    this.beforeUpdate(dt);
    this.update(dt);
    this.afterUpdate(dt);
  }


  beforeUpdate(dt) {
    //nothing
  }

  /**
   * @param {Number} dt time since last update
   */
  update(dt) {
    throw "not implemented";
  }

  afterUpdate(dt) {
    //nothing
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