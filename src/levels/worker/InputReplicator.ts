import { InputProvider } from "../../engine/core/Inputmanager";
import Vector from "../../engine/math/Vector";
import Vec2 from "../../engine/math/vector/Vec2";
import EventManager from "../../engine/services/Eventmanager";

export default class InputReplicator extends EventManager implements InputProvider {
  mousePos = Vector.create(2);

  constructor() {
    super();
    this.onMouseMove((pos: Vec2) => {
      this.mousePos = pos
    })
  }

  onKey(event: "keydown" | "keyup" | "mousedown" | "mouseup", callback: (key: string) => any, context?: any) {
    return super.on(event, callback, context);
  }

  onMouseMove(callback: (mousePos: Vec2) => any, context?: any) {
    return super.on("mousemove", callback, context);
  }
}
