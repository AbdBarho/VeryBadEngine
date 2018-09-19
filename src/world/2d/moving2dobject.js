import TwoDimensionalWorldObject from "./2dworldobject";
import Vector from "../../services/math/vector";

const START_VELOCITY = 1;
const MAX_VELOCITY = 10;
const START_ACCELRATION = 0.01;
const MAX_ACCELERATION = 10;
export default class Moving2DObject extends TwoDimensionalWorldObject {
  constructor() {
    super();
    this.velocity = new Vector([START_VELOCITY, START_VELOCITY]);
    this.acceleration = new Vector([START_ACCELRATION, START_ACCELRATION]);
  }

  move() {
    this.setPosition(this.pos.addVec(this.velocity));
  }

  /**
   * @param {Vector} vector
   */
  setSpeed(vector) {
    this.velocity = vector.limitValues(-MAX_VELOCITY, MAX_VELOCITY);
  }

  updateSpeed() {
    this.setSpeed(this.velocity.addVec(this.acceleration));
  }

  setAcceleration(vector) {
    this.acceleration = vector.limitValues(-MAX_ACCELERATION, MAX_ACCELERATION);
  }
}