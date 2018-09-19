import Container from "../../services/container";
import Moving2DObject from "./moving2dobject";
import MathHelper from "../../services/math";


const WIDTH = 20;
const HEIGHT = 20;
//cicle
// const LOOK_AHED_STEPS = 0;
// const RANDOM_FACTOR_SCALE = 0;
// const STOP_ON_REACH = false;

//particle effects
const LOOK_AHED_STEPS = 0;
const RANDOM_FACTOR_SCALE = 1;
const STOP_ON_REACH = false;

//perfect follower
// const LOOK_AHED_STEPS = 10;
// const RANDOM_FACTOR_SCALE = 0;
// const STOP_ON_REACH = true;

export default class MouseFollower extends Moving2DObject {
  constructor() {
    super();

    this.xTarget = 0;
    this.yTarget = 0;
    this.xDistance = 0;
    this.yDistance = 0;

    this.color = MathHelper.getRandomColor();

    this.worldDims = Container.getWorld().getDimensions();

    Container.getInputManager().on("mouse", (_, x, y) => {
      this.xTarget = x;
      this.yTarget = y;
    });
  }

  update() {
    this.updateDistanceToTarget();
    if (STOP_ON_REACH && this.targetReached())
      return;
    this.updateDirection();
    this.move();
    this.keepInScreen();
    this.updateSpeed();
  }
  updateDistanceToTarget() {
    this.xDistance = Math.abs(this.xTarget - this.x);
    this.yDistance = Math.abs(this.yTarget - this.y);
  }

  targetReached() {
    return this.xDistance < WIDTH / 2 && this.yDistance < HEIGHT / 2;
  }

  updateDirection() {
    let xStep = this.x + LOOK_AHED_STEPS * this.xVel;
    let yStep = this.y + LOOK_AHED_STEPS * this.yVel;
    let { x, y } = MathHelper.direction(xStep, yStep, this.xTarget, this.yTarget);
    //add some random number for entertainment
    let r = MathHelper.getRandomWithSign() * RANDOM_FACTOR_SCALE;
    this.setAcceleration(x + r, y + r);
  }

  keepInScreen() {
    this.x = MathHelper.limitBetween(this.x, 0, this.worldDims.width - WIDTH);
    this.y = MathHelper.limitBetween(this.y, 0, this.worldDims.height - HEIGHT);
  }


  render() {
    this.viewport.fillRect(this.x, this.y, WIDTH, HEIGHT, this.color);
  }

}
