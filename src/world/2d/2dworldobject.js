import WorldObject from "../worldobject";

export default class TwoDimensionalWorldObject extends WorldObject {
  constructor() {
    super();
    this.x = 0;
    this.y = 0;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }
}
