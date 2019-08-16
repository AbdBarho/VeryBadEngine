import { InputProvider } from "../../engine/core/Inputmanager";
import EventManager from "../../engine/services/Eventmanager";
import { V2 } from "../../engine/math/VectorTypes";

export default class InputReplicator extends EventManager implements InputProvider {
  mousePos: V2 = { x: 0, y: 0 };
  constructor() {
    super();
    this.onMouseMove((pos: V2) => this.mousePos = pos);
  }

  onKey(event: "keydown" | "keyup" | "mousedown" | "mouseup", callback: (key: string) => any, context?: any) {
    return super.on(event, callback, context);
  }

  onMouseMove(callback: (mousePos: V2) => any, context?: any) {
    return super.on("mousemove", callback, context);
  }
}
