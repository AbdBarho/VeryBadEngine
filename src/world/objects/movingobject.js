import Vector from "../../services/math/vector";
import DynamicObject from "./dynamicobject";
import GameState from "../../config/gamestate";


const MAX_VELOCITY = GameState.getMaxVelocity();
const MAX_ACCELERATION = GameState.getMaxAcceleration();
export default class MovingObject extends DynamicObject {
  constructor(numDims) {
    super(numDims);
    this.velocity = new Vector(numDims);
    this.acceleration = new Vector(numDims);
  }

  move() {
    this.pos.addVec(this.velocity);
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

  /**
   * @param {Vector} vector
   */
  setAcceleration(vector) {
    this.acceleration = vector.limitValues(-MAX_ACCELERATION, MAX_ACCELERATION);
  }
}