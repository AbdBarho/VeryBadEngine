import InputManager from "../engine/inputmanager";
import Viewport from "../engine/viewport";
import World from "../world/world";

let instances = {};
export default class Container {
  /**
   * @param {String} name
   * @param {any} obj
   */
  static register(name, obj) {
    if (instances[name])
      throw "already registered" + name;
    instances[name] = obj;
  }

  /**
   * @param {String} name
   */
  static get(name) {
    let obj = instances[name];
    if (!obj)
      throw "is not registered" + name;
    return obj;
  }

  /**
   * @returns {InputManager}
   */
  static getInputManager() {
    return this.get("InputManager");
  }

  /**
   * @returns {Viewport}
   */
  static getViewport() {
    return this.get("Viewport");
  }

  /**
   * @returns {World}
   */
  static getWorld() {
    return this.get("World");
  }
}
