import InputManager from "../../core/inputManager";
import EmptySystem from "../../ecs/system/emptySystem";

export default class InputSystem extends EmptySystem {
  inputManager: InputManager;
  constructor(inputManager: InputManager) {
    super();
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
