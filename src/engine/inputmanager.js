import EventManager from "../services/eventmanager";
import Logger from "../services/logger";
import Container from "../services/container";

export default class InputManager extends EventManager {
  constructor() {
    super();
    this.viewport = Container.getViewport();
    this.logger = new Logger(this, "InputManager");
    this.buttonStates = {};
    this.mousePos = { x: 0, y: 0 };
    Container.register("InputManager", this);
    this.initListeners();
  }

  initListeners() {

    window.addEventListener("keydown", (e) => this.keyboardPress(e, true));
    window.addEventListener("keyup", (e) => this.keyboardPress(e, false));

    window.addEventListener("mousedown", (e) => this.mousePress(e, true));
    window.addEventListener("mouseup", (e) => this.mousePress(e, false));

    window.addEventListener("mousemove", (e) => this.mouseStateUpdate(e));
    window.addEventListener("dblclick", (e) => this.mouseStateUpdate(e));
    window.addEventListener("click", (e) => this.mouseStateUpdate(e));

    window.addEventListener("blur", () => this.clearAll());
  }

  keyboardPress(e, isPressed) {
    // e.preventDefault();
    let name = e.code;
    this.updateButtonsState(name, isPressed);
    this.trigger("keyboard", e.type, name, isPressed);
  }

  mousePress(e, isPressed) {
    // e.preventDefault();
    let name = "Mouse" + (e.button + 1);
    this.updateButtonsState(name, isPressed);
    this.trigger("mouse", e.type, name, isPressed);
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
    ///no keys should be updated here
    let x = e.pageX;
    let y = e.pageY;
    Logger.debugInfo("pageX", x);
    Logger.debugInfo("pageY", y);
    //shift coordinates according to viewport
    this.mousePos = this.viewport.shiftAndScale(x, y);
    Logger.debugInfo(this.mousePos);
    this.trigger("mouse", e.type, x, y);
  }

  clearAll() {
    for (let key of Object.keys(this.buttonStates)) {
      delete this.buttonStates[key];
      let isMouse = key.indexOf("Mouse") === 0;
      let eventType = isMouse ? "mouse" : "keyboard";
      let eventName = isMouse ? "mouseup" : "keyup";
      Logger.debugInfo(key);
      this.trigger(eventType, eventName, key, false);
    }
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
