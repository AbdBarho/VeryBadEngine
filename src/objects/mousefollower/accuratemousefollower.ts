import MouseFollower from "./mousefollower";
import MathHelper from "../../math/math";
import Config from "../../config/config";
import Logger from "../../services/logger";


export default class AccurateMouseFollower extends MouseFollower {
  accelerationScale: number;
  constructor(params = Config.getConfig("ACCURATE_MOUSE_FOLLOWER")) {
    super(params);
    this.accelerationScale = params.ACCELERATION_SCALE;
  }

  update(dt: number) {
    this.updateDistance();
    if (this.stopOnReach && this.targetReached())
      return false;
    this.updateDirection();
    this.timeStep(dt);
    this.keepInWorld();
    // Logger.debugInfo(this);
    return true;
  }

  updateDirection() {
    let step = this.pos;
    if (this.lookAhedSteps === 1)
      step = step.copy().addVec(this.velocity);
    else if (this.lookAhedSteps !== 0)
      step = step.copy().addVec(this.velocity.copy().mulNum(this.lookAhedSteps));

    let dir = MathHelper.direction2d(step, this.target).mulNum(this.accelerationScale);
    if (this.randomFactorScale !== 0)
      dir.addNum(MathHelper.getSignedRandom() * this.randomFactorScale * this.accelerationScale);

    this.setAcceleration(dir);
  }
}