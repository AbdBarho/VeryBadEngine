import Vector from "../../math/vector";
import Config from "../../config/config";
import BehavingObject, { BehavingObjectParameter } from "./behavingobject";

export interface MovingObjectParameter extends BehavingObjectParameter {
  VELOCITY: Vector,
  ACCELERATION: Vector,
  MAX_VELOCITY: number,
  MAX_ACCELERATION: number
}

//FIXME: move collision detection to engine
const WORLD_EDGES = Config.getConfig("WORLD").SIZE;
export default class MovingObject extends BehavingObject {
  velocity: Vector;
  acceleration: Vector;
  MAX_VELOCITY: number;
  MAX_ACCELERATION: number;

  constructor(params: MovingObjectParameter) {
    super(params);
    this.velocity = params.VELOCITY;
    this.acceleration = params.ACCELERATION;
    this.MAX_VELOCITY = params.MAX_VELOCITY;
    this.MAX_ACCELERATION = params.MAX_ACCELERATION;
  }

  update(dt: number) {
    this.timeStep(dt);
    return true;
  }

  timeStep(dt: number) {
    // Symplectic Euler
    this.setSpeed(this.velocity.addVec(this.acceleration.copy().mulNum(dt)));
    this.pos.addVec(this.velocity.copy().mulNum(dt));
  }

  setSpeed(vector: Vector) {
    this.velocity = vector.limitValues(-this.MAX_VELOCITY, this.MAX_VELOCITY);
  }

  setAcceleration(vector: Vector) {
    this.acceleration = vector.limitValues(-this.MAX_ACCELERATION, this.MAX_ACCELERATION);
  }

  //FIXME move to physics engine
  keepInWorld() {
    this.pos.limitByMinMax(this.centerShift, WORLD_EDGES);
  }

}