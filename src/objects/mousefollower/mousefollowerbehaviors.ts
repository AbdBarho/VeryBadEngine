import MouseFollower from "./mousefollower";
import StateManager, { State } from "../states/statemanager";

class Freeze extends State {
  constructor() {
    super("Freeze");
  }
  activate(context: MouseFollower) { context.isFrozen = true; }
  deactivate(context: MouseFollower) { context.isFrozen = false; }
}

class Circle extends State {
  constructor() {
    super("Circle");
  }
  activate(context: MouseFollower) { context.setMovementParameters(0, 0, false); }
}

class ParticleEffect extends State {
  constructor() {
    super("Particle Effect");
  }
  activate(context: MouseFollower) { context.setMovementParameters(0, 1, false); }
}

class PerfectFollower extends State {
  constructor() {
    super("Perfect Follower");
  }
  activate(context: MouseFollower) { context.setMovementParameters(0.5, 0, true); }
}


let states = [new Freeze(), new Circle(), new ParticleEffect(), new PerfectFollower()];

export default class MouseFollowerStateManager extends StateManager {
  constructor(instance: MouseFollower) {
    super(instance);
  }
  getState(id: number) {
    return states[id];
  }
}