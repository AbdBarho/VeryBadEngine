import Behavior from "../behaviour/behaviour";
import MouseFollower from "./mousefollower"; //eslint-disable-line

export default class PerfectFollowerBehavior extends Behavior {
  /**
   * @param {MouseFollower} context
   */
  constructor(context) {
    super("Perfect Follower");
    this.follower = context;
  }
  activate() {
    this.follower.LOOK_AHED_STEPS = 10;
    this.follower.RANDOM_FACTOR_SCALE = 0;
    this.follower.STOP_ON_REACH = true;
  }

  deactivate() {
    //nothing
  }
}