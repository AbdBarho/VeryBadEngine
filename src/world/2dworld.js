import Container from "../services/container";
import MouseFollower from "./mousefollower";

export default class TwoDimensionalWorld {
  constructor() {
    this.objects = [];
    this.visibleDimensions = {};
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

}
