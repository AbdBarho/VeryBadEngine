import Canvas from "./canvas";
import Vector from "../math/vector";

export default class InputManager {
  ui: Canvas;
  buttonStates: { [key: string]: boolean } = {};
  mousePos = new Vector(2);
  stateChanged = false;

  constructor(ui: Canvas) {
    this.ui = ui;
    window.addEventListener("keydown", e => this.updateButtonsState(e.code, true));
    window.addEventListener("keyup", e => this.updateButtonsState(e.code, false));

    window.addEventListener("mousedown", e => this.updateButtonsState("Mouse" + (e.button + 1), true));
    window.addEventListener("mouseup", e => this.updateButtonsState("Mouse" + (e.button + 1), false));

    window.addEventListener("mousemove", e => this.mouseStateUpdate(e));

    window.addEventListener("blur", () => this.clearAll());
  }

  private updateButtonsState(name: string, isPressed: boolean) {
    this.buttonStates[name] = isPressed;
    this.stateChanged = true;
  }

  private mouseStateUpdate(e: MouseEvent) {
    this.mousePos = this.ui.pixelToUnit(e.pageX, e.pageY);
    this.stateChanged = true;
  }

  private clearAll() {
    for (let key of Object.keys(this.buttonStates))
      delete this.buttonStates[key];
  }

  getMousePosition() {
    return this.mousePos;
  }

  isPressed(name: string) {
    return this.buttonStates[name] || false;
  }
}