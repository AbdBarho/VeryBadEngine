import Behavior from "../behaviour/behaviour";
import MouseFollower from "./mousefollower";

class MouseFollowerBehavior extends Behavior {
  follower: MouseFollower;
  constructor(name: string, context: MouseFollower) {
    super(name);
    this.follower = context;
  }
}

class Freeze extends MouseFollowerBehavior {
  constructor(context: MouseFollower) {
    super("Freeze", context);
  }

  activate() {
    this.storage.update = this.follower.update;
    this.follower.update = () => false;
  }

  deactivate() {
    this.follower.update = this.storage.update;
    delete this.storage.update;
  }
}

class Circle extends MouseFollowerBehavior {
  constructor(context: MouseFollower) {
    super("Circle", context);
  }

  activate = () => this.follower.setMovementParameters(0, 0, false);
  deactivate = () => { };
}

class ParticleEffect extends MouseFollowerBehavior {
  constructor(context: MouseFollower) {
    super("Particle Effect", context);
  }


  activate = () => this.follower.setMovementParameters(0, 1, false);
  deactivate = () => { };
}

class PerfectFollower extends MouseFollowerBehavior {
  constructor(context: MouseFollower) {
    super("Perfect Follower", context);
  }
  activate = () => this.follower.setMovementParameters(0.5, 0, true);
  deactivate = () => { };
}


export default [Freeze, Circle, ParticleEffect, PerfectFollower];