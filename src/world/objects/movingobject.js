import Vector from "../../services/math/vector";
import DynamicObject from "./dynamicobject";
import Config from "../../config/config";

//FIXME: move collision detection to engine

let WORLD_EDGES = Config.getWorldSize().subVec(new Vector([10,10]));
export default class MovingObject extends DynamicObject {
  constructor(params) {
    super(params);
    this.velocity = params.VELOCITY.copy();
    this.acceleration = params.ACCELERATION.copy();

    this.MAX_VELOCITY = params.MAX_VELOCITY;
    this.MAX_ACCELERATION = params.MAX_ACCELERATION;
  }

  timeStep(dt) {
    // Symplectic Euler
    this.setSpeed(this.velocity.addVec(this.acceleration.copy().mulNum(dt)));
    this.pos.addVec(this.velocity.copy().mulNum(dt));
  }
  /**
   * @param {Vector} vector
   */
  setSpeed(vector) {
    this.velocity = vector;
    this.velocity.limitValues(-this.MAX_VELOCITY, this.MAX_VELOCITY);
  }

  /**
   * @param {Vector} vector
   */
  setAcceleration(vector) {
    this.acceleration = vector;
    this.acceleration.limitValues(-this.MAX_ACCELERATION, this.MAX_ACCELERATION);
  }

  //FIXME
  keepInWorld() {
    this.pos.limitByMinMax(this.centerShift, WORLD_EDGES);
  }

}