import Vector from "../../engine/math/Vector";
import Vec2 from "../../engine/math/vector/Vec2";
import { QueuedEventManager } from "../services/Eventmanager";
import Canvas from "./canvas/Canvas";
import { V2 } from "../math/vector/VectorTypes";

export interface InputProvider {
  mousePos: V2;
  onKey: (event: "keydown" | "keyup" | "mousedown" | "mouseup", callback: (key: string) => any, context?: any) => any;
  onMouseMove: (callback: (mousePos: V2) => any, context?: any) => any;
  off: (...args: any[]) => any;
}

export default class InputManager extends QueuedEventManager implements InputProvider {
  canvas: Canvas;
  buttonStates: { [key: string]: boolean } = {};
  mousePos: V2 = { x: 0, y: 0 };

  constructor(canvas: Canvas) {
    super();
    this.canvas = canvas;
    window.addEventListener("keydown", e => this.updateButtonsState("keydown", e.code, true));
    window.addEventListener("keyup", e => this.updateButtonsState("keyup", e.code, false));

    window.addEventListener("mousedown", e => this.updateButtonsState("mousedown", "Mouse" + (e.button + 1), true));
    window.addEventListener("mouseup", e => this.updateButtonsState("mouseup", "Mouse" + (e.button + 1), false));

    window.addEventListener("mousemove", e => this.mousePositionUpdate("mousemove", e));

    window.addEventListener("blur", () => this.clearAll());
    window.addEventListener("contextmenu", e => e.preventDefault());
  }

  private updateButtonsState(event: string, name: string, isPressed: boolean) {
    this.buttonStates[name] = isPressed;
    this.queueEvent(event, name);
  }

  private mousePositionUpdate(event: string, e: MouseEvent) {
    this.mousePos = this.canvas.pixelToUnit(e.pageX, e.pageY);
    if (this.queue.length && this.queue[this.queue.length - 1].event === event) {
      this.queue.pop();
    }
    this.queueEvent(event, this.mousePos);
  }

  private clearAll() {
    for (let key of Object.keys(this.buttonStates)) {
      let event = key.indexOf("Mouse") === 0 ? "mouseup" : "keyup";
      this.queueEvent(event, key);
      delete this.buttonStates[key];
    }
  }

  onKey(event: "keydown" | "keyup" | "mousedown" | "mouseup", callback: (key: string) => any, context?: any) {
    return super.on(event, callback, context);
  }

  onMouseMove(callback: (mousePos: V2) => any, context?: any) {
    return super.on("mousemove", callback, context);
  }
}
