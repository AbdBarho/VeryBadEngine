import InputManager from "../../core/inputManager";
import EmptySystem from "../../ecs/system/emptySystem";

export default class InputSystem extends EmptySystem {
  inputManager: InputManager;
  constructor(inputManager: InputManager) {
    super();
    this.inputManager = inputManager;
  }

  update() {
    this.inputManager.executeQueue();
  }
}
