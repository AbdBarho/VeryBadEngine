import InitialState from "./initialgamestate";
import Vector from "../services/math/vector";
import EventManager from "../services/eventmanager";
import Behavior from "../world/behaviour/behaviour";

class GameState {
  constructor() {
    this.state = InitialState;
    EventManager.on("input_mousemove", (x, y) => this.state.MOUSE = new Vector([x, y]));
  }

  getMousePos() {
    return this.state.MOUSE.copy();
  }

  getMaxVelocity() {
    return this.state.MOVEMENT.MAX_VELOCITY;
  }

  getMaxAcceleration() {
    return this.state.MOVEMENT.MAX_ACCELERATION;
  }

  /**
   * @param {String} name
   * @returns {{SIZE: Vector, BEHAVIORS: Behavior[], DEFAULT_BEHAVIOR_INDEX: Number}}
   */
  getConfig(name) {
    return this.state.OBJECTS[name];
  }

  getWorldSize() {
    return this.state.WORLD.SIZE.copy();
  }
}

export default new GameState();