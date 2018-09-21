import EventManager from "../services/eventmanager";
import Logger from "../services/logger";

export default class InputManager {
  constructor(renderer) {
    this.logger = new Logger(this, "InputManager");
    this.mousePos = { x: 0, y: 0 };
    this.buttonStates = {};
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

    EventManager.on("canvas", params => this.canvasParams = params);
  }

  keyboardPress(e, isPressed) {
    // e.preventDefault();
    let name = e.code;
    this.updateButtonsState(name, isPressed);
    EventManager.trigger("input_" + e.type + "_" + name);
  }

  mousePress(e, isPressed) {
    // e.preventDefault();
    let name = "Mouse" + (e.button + 1);
    this.updateButtonsState(name, isPressed);
    EventManager.trigger("input_" + e.type + "_" + name, this.mousePos.x, this.mousePos.y);
  }

  updateButtonsState(name, isPressed) {
    if (isPressed)
      this.buttonStates[name] = isPressed;
    else
      delete this.buttonStates[name];
    Logger.debugInfo(name, isPressed);
  }

  mouseStateUpdate(e) {
    // e.preventDefault();
    let x = e.pageX;
    let y = e.pageY;
    //shift coordinates according to viewport
    this.mousePos = this.pixelToUnit(x, y);
    Logger.debugInfo(this.mousePos);
    EventManager.trigger("input_" + e.type, this.mousePos.x, this.mousePos.y);
  }

  clearAll() {
    for (let key of Object.keys(this.buttonStates)) {
      delete this.buttonStates[key];
      if (key.indexOf("Mouse") === 0)
        EventManager.trigger("input_mouseup", this.mousePos.x, this.mousePos.y, key, false);
      else
        EventManager.trigger("input_keyup", key, false);
      Logger.debugInfo(key);
    }
  }

  /**
   * @param {Number} x
   * @param {Number} y
   * @returns {{x:Number, y: Number}} from pixels in page to game units
   */
  pixelToUnit(x, y) {
    x -= this.canvasParams.xShift;
    x /= this.canvasParams.scale;
    y -= this.canvasParams.yShift;
    y /= this.canvasParams.scale;
    return { x, y };
  }

  /**
   * @param {String} name key or button name
   * @returns {Boolean} is the key pressed or not
   */
  isPressed(name) {
    return this.buttonStates[name] || false;
  }

  /**
   * @returns {{x:Number, y:Number}}
   */
  getMousePos() {
    return Object.assign({}, this.mousePos);
  }

}