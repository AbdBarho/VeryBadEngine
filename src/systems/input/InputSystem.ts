import InputManager from "../../core/Inputmanager";
import EmptySystem from "../../ecs/system/Emptysystem";
import Update from "../../ecs/system/Update";

export default class InputSystem extends EmptySystem {
  inputManager: InputManager;
  constructor(inputManager: InputManager) {
    super("Input", Update.every);
    this.inputManager = inputManager;
  }

  init() {
    this.inputManager.emptyQueue();
  }

  update() {
    this.inputManager.executeQueue();
  }

  destroy() {
    this.inputManager.emptyQueue();
  }
}
