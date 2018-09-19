import TwoDimensionalWorldObject from "./2dworldobject";

const START_VELOCITY = 1;
const MAX_VELOCITY = 5;
const START_ACCELRATION = 0.01;
const MAX_ACCELERATION = 2;
export default class Moving2DObject extends TwoDimensionalWorldObject {
  constructor() {
    super();
    this.xVel = START_VELOCITY;
    this.yVel = START_VELOCITY;
    this.xAcc = START_ACCELRATION;
    this.yAcc = START_ACCELRATION;
  }

  move() {
    this.x += this.xVel;
    this.y += this.yVel;
  }

  setSpeed(x, y) {
    this.xVel = limitSpeed(x);
    this.yVel = limitSpeed(y);
  }
  updateSpeed() {
    this.xVel = limitSpeed(this.xVel + this.xAcc);
    this.yVel = limitSpeed(this.yVel + this.yAcc);
  }

  setAcceleration(x, y) {
    this.xAcc = limitAcceleration(x);
    this.yAcc = limitAcceleration(y);
  }

  accelerate(x, y) {
    this.xAcc = limitAcceleration(this.xAcc + x);
    this.yAcc = limitAcceleration(this.yAcc + y);
  }

}

function limitSpeed(speed) {
  return limit(speed, MAX_VELOCITY);
}

function limitAcceleration(acc) {
  return limit(acc, MAX_ACCELERATION);
}

function limit(val, max) {
  if (val > 0)
    return Math.min(max, val);
  else
    return Math.max(-max, val);
}