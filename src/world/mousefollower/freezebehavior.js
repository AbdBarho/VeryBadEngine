import Behavior from "../behaviour/behaviour";
import MouseFollower from "./mousefollower"; //eslint-disable-line

export default class FreezeBehavior extends Behavior {
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