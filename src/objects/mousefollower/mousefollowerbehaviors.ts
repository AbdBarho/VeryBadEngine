import MouseFollower from "./mousefollower";
import StateManager, { State } from "../states/statemanager";

export default class MouseFollowerStateManager extends StateManager {
  states: State[];
  constructor(instance: MouseFollower) {
    super(instance);
    this.states = [
      new State("Freeze", (obj: MouseFollower) => obj.isFrozen = true, (obj: MouseFollower) => obj.isFrozen = false),
      new State("Circle", (obj: MouseFollower) => obj.setMovementParameters(0, 0, false)),
      new State("Particle Effect", (obj: MouseFollower) => obj.setMovementParameters(0, 1, false)),
      new State("Perfect Follower", (obj: MouseFollower) => obj.setMovementParameters(0.2, 0, true))
    ]
  }
  getState(id: number) {
    return this.states[id];
  }
}