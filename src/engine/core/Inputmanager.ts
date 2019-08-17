import { QueuedEventManager } from "../services/Eventmanager";
import Canvas from "./canvas/Canvas";
import { V2 } from "../math/VectorTypes";

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

    this.key = this.key.bind(this);
    window.addEventListener("keydown", this.key);
    window.addEventListener("keyup", this.key);
    window.addEventListener("mousedown", this.key);
    window.addEventListener("mouseup", this.key);
    window.addEventListener("mousemove", e => this.mousePositionUpdate("mousemove", e));
    window.addEventListener("contextmenu", this.killEvent);

    window.addEventListener("blur", () => this.clearAll());
    window.addEventListener("resize", () => this.canvas.resize());
  }
  private killEvent(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
  }
  private key(e: MouseEvent | KeyboardEvent) {
    // this.killEvent(e);
    switch (e.type) {
      case "keydown":
        e = e as KeyboardEvent;
        this.updateButtonsState(e.type, e.code, true);
        return
      case "keyup":
        e = e as KeyboardEvent;
        this.updateButtonsState(e.type, e.code, false);
        return

      case "mousedown":
        e = e as MouseEvent;
        this.updateButtonsState(e.type, "Mouse" + (e.button + 1), true);
        return

      case "mouseup":
        e = e as MouseEvent;
        this.updateButtonsState(e.type, "Mouse" + (e.button + 1), false);
        return
    }
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
