import Behavior from "../behaviour/behaviour";
import MouseFollower from "./mousefollower"; //eslint-disable-line


class FreezeBehavior extends Behavior {
  /**
   * @param {MouseFollower} context
   */
  constructor(context) {
    super("Freeze");
    this.follower = context;
  }

  activate() {
    this.storage.update = this.follower.update;
    this.follower.update = this.follower.getRenderingCommand;
  }

  deactivate() {
    this.follower.update = this.storage.update;
    delete this.storage.update;
  }
}

class CircleBehavior extends Behavior {

  constructor(context) {
    super("Circle");
    this.follower = context;
  }

  activate() {
    this.follower.setMovementParameters(0, 0, false);
  }

  deactivate() {
    //nothing
  }
}

class ParticleEffectBehavior extends Behavior {

  constructor(context) {
    super("Particle Effect");
    this.follower = context;
  }
  activate() {
    this.follower.setMovementParameters(0, 1, false);
  }

  deactivate() {
    //nothing
  }
}

class PerfectFollowerBehavior extends Behavior {

  constructor(context) {
    super("Perfect Follower");
    this.follower = context;
  }
  activate() {
    this.follower.setMovementParameters(0.5, 0, true);
  }

  deactivate() {
    //nothing
  }
}


export default [FreezeBehavior, CircleBehavior, ParticleEffectBehavior, PerfectFollowerBehavior];