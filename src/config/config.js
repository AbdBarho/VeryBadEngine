import InitialState from "./initialgamestate";
import Vector from "../services/math/vector";
import EventManager from "../services/eventmanager";

class Config {
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

  getConfig(name) {
    return this.state.OBJECTS[name];
  }

  getWorldSize() {
    return this.state.WORLD.SIZE.copy();
  }

  getUpdateInterval() {
    return this.state.ENGINE.UPDATE_INTERVAL;
  }
}

export default new Config();