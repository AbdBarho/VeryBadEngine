import Vector from "../math/vector";
import EventManager from "../services/eventmanager";
import initialgamestate from "./initialgamestate";

class Config {
  state = initialgamestate;
  constructor() {
    EventManager.on("input_mousemove", (vec: Vector) => this.state.MOUSE.setVec(vec));
  }
  getMousePos() {
    return this.state.MOUSE;
  }
  getConfig(name: string) {
    return copy(this.state[name]);
  }
}

export default new Config();

function copy(obj: any) {
  let copy: any = {};
  for (let [key, value] of Object.entries(obj))
    if (value instanceof Vector)
      copy[key] = value.copy();
    else
      copy[key] = value;
  return copy;
}