import InitialState from "./initialgamestate";
import Vector from "../math/vector";
import EventManager from "../services/eventmanager";

class Config {
  constructor() {
    this.state = InitialState;
    EventManager.on("input_mousemove", (vec) => this.state.MOUSE = vec);
  }

  getMousePos() {
    return this.state.MOUSE.copy();
  }

  getConfig(name) {
    return copy(this.state[name]);
  }
}

export default new Config();

function copy(obj) {
  let copy = {};
  for (let [key, value] of Object.entries(obj))
    if (value instanceof Vector)
      copy[key] = value.copy();
    else
      copy[key] = value;
  return copy;
}