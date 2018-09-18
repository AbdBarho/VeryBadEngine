import EventManager from "../services/eventmanager";
import Logger from "../services/logger";

export default class InputManager extends EventManager {
  constructor() {
    super();
    this.logger = new Logger(this, "InputManager");
    this.buttonStates = {};
    this.mouseState = {};
    this.initListeners();
  }

  initListeners() {

    window.addEventListener("keydown", (e) =>
      this.updateState(e.type, e.code, true));

    window.addEventListener("keyup", (e) =>
      this.updateState(e.type, e.code, false));

    window.addEventListener("mousedown", (e) =>
      this.updateState(e.type, "Mouse" + (e.button + 1), true));

    window.addEventListener("mouseup", (e) =>
      this.updateState(e.type, "Mouse" + (e.button + 1), false));

    window.addEventListener("mousemove", (e) => this.mouseStateUpdate(e));
    window.addEventListener("dblclick", (e) => this.mouseStateUpdate(e));
    window.addEventListener("click", (e) => this.mouseStateUpdate(e));

    window.addEventListener("blur", () => this.clearAll());
  }

  /**
   * @param {"keydown"|"keyup"|"mousedown"|"mouseup"} type event type
   * @param {String} name key name
   * @param {Boolean} isPressed the new state of the key
   */
  updateState(type, name, isPressed) {
    if (isPressed)
      this.buttonStates[name] = isPressed;
    else
      delete this.buttonStates[name];
    this.logger.log(3, "state update", type, name, isPressed);
    Logger.debugInfo(name, isPressed);
    this.trigger(type, name, isPressed, this);
  }

  /**
   * @param {MouseEvent} e
   */
  mouseStateUpdate(e) {
    ///no keys should be updated here
    this.mouseState.x = e.clientX;
    this.mouseState.y = e.clientY;
    Logger.debugInfo("x", e.clientX);
    Logger.debugInfo("y", e.clientY);
    this.trigger(e.type, e.clientX, e.clientY, this);
  }

  clearAll() {
    for (let key of Object.keys(this.buttonStates)) {
      let eventName = key.indexOf("Mouse") === 0 ? "mouseup" : "keyup";
      Logger.debugInfo(key);
      this.trigger(eventName, key, false, this);
    }
    this.buttonStates = {};
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
    return Object.assign({}, this.mouseState);
  }

}
