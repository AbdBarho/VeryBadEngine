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
    if (this.isFrozen)
      return false;
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
    let dir;
    if (this.lookAhedSteps === 1) {
      this.pos.cache();
      this.pos.addVec(this.velocity);
      dir = MathHelper.direction2d(this.pos, this.target).mulNum(this.accelerationScale);
      this.pos.uncache();
    } else if (this.lookAhedSteps !== 0) {
      this.pos.cache();
      this.velocity.cache();
      this.pos.addVec(this.velocity.mulNum(this.lookAhedSteps));
      dir = MathHelper.direction2d(this.pos, this.target).mulNum(this.accelerationScale);
      this.velocity.uncache();
      this.pos.uncache();
    } else {
      dir = MathHelper.direction2d(this.pos, this.target).mulNum(this.accelerationScale);
    }

    if (this.randomFactorScale !== 0)
      dir.addNum(MathHelper.getSignedRandom() * this.randomFactorScale * this.accelerationScale);

    this.setAcceleration(dir);
  }
}