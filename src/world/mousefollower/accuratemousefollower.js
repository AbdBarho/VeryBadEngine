import MouseFollower from "./mousefollower";
import MathHelper from "../../services/math/math";
import Config from "../../config/config";
import Logger from "../../services/logger";

export default class AccurateMouseFollower extends MouseFollower {
  constructor(params = Config.getConfig("ACCURATE_MOUSE_FOLLOWER")) {
    super(params);
    this.ACCELERATION_SCALE = params.ACCELERATION_SCALE;
  }

  update(dt) {
    this.updateDistance();
    if (this.STOP_ON_REACH && this.targetReached())
      return;
    this.updateDirection();
    this.timeStep(dt);
    this.keepInWorld();
  }

  updateDirection() {
    let step = this.pos;
    if (this.LOOK_AHED_STEPS === 1)
      step = step.copy().addVec(this.velocity);
    else if (this.LOOK_AHED_STEPS !== 0)
      step = step.copy().addVec(this.velocity.copy().mulNum(this.LOOK_AHED_STEPS));

    let dir = MathHelper.direction2d(step, this.target).mulNum(this.ACCELERATION_SCALE);
    if (this.RANDOM_FACTOR_SCALE !== 0)
      dir.addNum(MathHelper.getSignedRandom() * this.RANDOM_FACTOR_SCALE * this.ACCELERATION_SCALE);

    this.setAcceleration(dir);
  }
}