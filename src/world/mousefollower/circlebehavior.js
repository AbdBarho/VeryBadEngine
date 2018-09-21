import Behavior from "../behaviour/behaviour";
import MouseFollower from "./mousefollower"; //eslint-disable-line

export default class CircleBehavior extends Behavior {
  /**
   * @param {MouseFollower} context
   */
  constructor(context) {
    super("Circle");
    this.follower = context;
  }

  activate() {
    this.follower.LOOK_AHED_STEPS = 0;
    this.follower.RANDOM_FACTOR_SCALE = 0;
    this.follower.STOP_ON_REACH = false;
  }

  deactivate() {
    //nothing
  }
}