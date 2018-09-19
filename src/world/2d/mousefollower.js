import Container from "../../services/container";
import Moving2DObject from "./moving2dobject";
import MathHelper from "../../services/math";
import Logger from "../../services/logger";

const WIDTH = 20;
const HEIGHT = 20;

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
    // if (this.targetReached())
    //   return;
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
    let { x, y } = MathHelper.direction(this.x, this.y, this.xTarget, this.yTarget);
    let factor = (this.xDistance + this.yDistance) / 1000;
    //add some random number for entertainment
    let r = Math.random() /5;
    this.setAcceleration(x * factor + r, y * factor + r);
    // this.setSpeed(x, y);
  }

  keepInScreen() {
    if (this.x >= this.worldDims.width)
      this.x = 0;
    else if (this.x < 0)
      this.x = this.worldDims.width;

    if (this.y >= this.worldDims.height)
      this.y = 0;
    else if (this.y < 0)
      this.y = this.worldDims.height;
  }


  render() {
    this.viewport.fillRect(this.x, this.y, WIDTH, HEIGHT, this.color);
  }

}
