import MouseFollower from "./mousefollower";
import StateManager, { State } from "../states/statemanager";

let freeze = new State("Freeze",
  (obj: MouseFollower) => obj.isFrozen = true,
  (obj: MouseFollower) => obj.isFrozen = false);

let circle = new State("Circle", (obj: MouseFollower) => obj.setMovementParameters(0, 0, false));
let particle = new State("Particle Effect", (obj: MouseFollower) => obj.setMovementParameters(0, 1, false));
let perfect = new State("Perfect Follower", (obj: MouseFollower) => obj.setMovementParameters(0.5, 0, true));

let states = [freeze, circle, particle, perfect];

export default class MouseFollowerStateManager extends StateManager {
  constructor(instance: MouseFollower) {
    super(instance);
  }
  getState(id: number) {
    return states[id];
  }
}