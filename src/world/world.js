import Container from "../services/container";
import Vector from "../services/math/vector";

export default class World {
  constructor() {
    this.objects = [];
    Container.register("World", this);
  }



  addObject(obj) {
    this.objects.push(obj);
  }

  getObjects() {
    return this.objects;
  }

  update() {
    for (let obj of this.objects)
      obj.update();
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
