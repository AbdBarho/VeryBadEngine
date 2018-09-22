import InitialState from "./initialgamestate";
import Vector from "../math/vector";
import EventManager from "../services/eventmanager";

class Config {
  constructor() {
    this.state = InitialState;
    EventManager.on("input_mousemove", (x, y) => this.state.MOUSE = new Vector([x, y]));
  }

  getMousePos() {
    return this.state.MOUSE.copy();
  }

  getConfig(name) {
    return this.copy(this.state[name]);
  }
  copy(obj) {
    let copy = {};
    for (let [key, value] of Object.entries(obj))
      if (value instanceof Vector)
        copy[key] = value.copy();
      else
        copy[key] = value;
    return copy;
  }
}

let instance = new Config();
export default instance;