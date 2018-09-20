import WorldObject from "../worldobject";
import Vector from "../../services/math/vector";

export default class TwoDimensionalWorldObject extends WorldObject {
  constructor() {
    super();
    this.pos = new Vector([0, 0]);
  }

  setPosition(vector) {
    this.pos = vector;
  }
}