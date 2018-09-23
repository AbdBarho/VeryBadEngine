import EventManager from "../services/eventmanager";
import Logger from "../services/logger";
import Vector from "../math/vector";
import Renderer from "../ui/renderer";
import { CanvasParameters } from "../ui/resizablecanvas";

export default class InputManager {
  logger = new Logger(this, "InputManager");
  mousePos = new Vector(2);
  buttonStates: any = {};
  canvasParams: CanvasParameters;

  constructor(renderer: Renderer) {
    this.canvasParams = renderer.getParamaters();
    this.initListeners();
  }

  initListeners() {
    window.addEventListener("keydown", e => this.keyboardPress(e, true));
    window.addEventListener("keyup", e => this.keyboardPress(e, false));

    window.addEventListener("mousedown", e => this.mousePress(e, true));
    window.addEventListener("mouseup", e => this.mousePress(e, false));

    window.addEventListener("mousemove", e => this.mouseStateUpdate(e));
    window.addEventListener("dblclick", e => this.mouseStateUpdate(e));
    window.addEventListener("click", e => this.mouseStateUpdate(e));

    window.addEventListener("blur", () => this.clearAll());

    EventManager.on("canvas", (params: any) => this.canvasParams = params, this);
  }

  keyboardPress(e: KeyboardEvent, isPressed: boolean) {
    // e.preventDefault();
    let name = e.code;
    this.updateButtonsState(name, isPressed);
    EventManager.trigger("input_" + e.type + "_" + name);
  }

  mousePress(e: MouseEvent, isPressed: boolean) {
    // e.preventDefault();
    let name = "Mouse" + (e.button + 1);
    this.updateButtonsState(name, isPressed);
    EventManager.trigger("input_" + e.type + "_" + name, this.mousePos);
  }

  updateButtonsState(name: string, isPressed: boolean) {
    if (isPressed)
      this.buttonStates[name] = isPressed;
    else
      delete this.buttonStates[name];
    Logger.debugInfo(name, isPressed);
  }

  mouseStateUpdate(e: MouseEvent) {
    // e.preventDefault();
    let x = e.pageX;
    let y = e.pageY;
    //shift coordinates according to viewport
    this.mousePos = this.pixelToUnit(x, y);
    Logger.debugInfo("MousePos", this.mousePos.copy().floor().getValues());
    EventManager.trigger("input_" + e.type, this.mousePos);
  }

  clearAll() {
    for (let key of Object.keys(this.buttonStates)) {
      delete this.buttonStates[key];
      if (key.indexOf("Mouse") === 0)
        EventManager.trigger("input_mouseup", this.mousePos, key);
      else
        EventManager.trigger("input_keyup", key);
      Logger.debugInfo(key);
    }
  }

  pixelToUnit(x: number, y: number) {
    let pos = new Vector([x, y]);
    pos.subVec(this.canvasParams.SHIFT);
    pos.divVec(this.canvasParams.SCALE);
    return pos;
  }
}