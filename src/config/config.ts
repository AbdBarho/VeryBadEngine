import Vector from "../math/vector";
import EventManager from "../services/eventmanager";
import initialgamestate from "./initialgamestate";

class Config {
  state = initialgamestate;
  getMousePos = () => this.state.MOUSE.copy();
  getConfig = (name: string) => copy(this.state[name]);

  constructor() {
    EventManager.on("input_mousemove", (vec: Vector) => this.state.MOUSE = vec);
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