import Behavior from "../behaviour/behaviour";
import MouseFollower from "./mousefollower"; //eslint-disable-line

export default class ParticleEffectBehavior extends Behavior {
  /**
   * @param {MouseFollower} context
   */
  constructor(context) {
    super("Particle Effect");
    this.follower = context;
  }
  activate() {
    this.follower.LOOK_AHED_STEPS = 0;
    this.follower.RANDOM_FACTOR_SCALE = 1.5;
    this.follower.STOP_ON_REACH = false;
  }

  deactivate() {
    //nothing
  }
}