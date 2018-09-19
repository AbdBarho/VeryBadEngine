import Vector from "../services/math/vector";

export default class World {
  constructor() {
    this.objects = [];
  }

  addObject(obj) {
    this.objects.push(obj);
  }

  getObjects() {
    return this.objects;
  }

  getDimensions() {
    throw "not implemented";
  }

  /**
   * @returns {Vector}
   */
  getSize() {
    throw "not implemented";
  }
}
