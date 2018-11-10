import Vector from "../math/vector";
import { QueuedEventManager } from "../services/eventmanager";
import Canvas from "./canvas";

type InputEvent = "keydown" | "keyup" | "mousedown" | "mouseup" | "mousemove";
type InputCallback = (value: string | Vector) => any;

export default class InputManager extends QueuedEventManager {
  ui: Canvas;
  buttonStates: { [key: string]: boolean } = {};
  mousePos = new Vector(2);

  constructor(ui: Canvas) {
    super();
    this.ui = ui;
    window.addEventListener("keydown", e => this.updateButtonsState("keydown", e.code, true));
    window.addEventListener("keyup", e => this.updateButtonsState("keyup", e.code, false));

    window.addEventListener("mousedown", e => this.updateButtonsState("mousedown", "Mouse" + (e.button + 1), true));
    window.addEventListener("mouseup", e => this.updateButtonsState("mouseup", "Mouse" + (e.button + 1), false));

    window.addEventListener("mousemove", e => this.mouseStateUpdate("mousemove", e));

    window.addEventListener("blur", () => this.clearAll());
  }

  private updateButtonsState(event: string, name: string, isPressed: boolean) {
    this.buttonStates[name] = isPressed;
    this.queueEvent(event, name);
  }

  private mouseStateUpdate(event: string, e: MouseEvent) {
    this.mousePos = this.ui.pixelToUnit(e.pageX, e.pageY);
    this.queueEvent(event, this.mousePos.copy());
  }

  private clearAll() {
    for (let key of Object.keys(this.buttonStates)) {
      let event = key.indexOf("Mouse") === 0 ? "mouseup" : "keyup";
      this.queueEvent(event, key);
      delete this.buttonStates[key];
    }
  }

  on(event: InputEvent, callback: InputCallback, context?: any) {
    return super.on(event, callback, context);
  }

  getMousePosition() {
    return this.mousePos.copy();
  }
}
