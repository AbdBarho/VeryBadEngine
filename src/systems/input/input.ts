import InputManager from "../../core/inputmanager";
import EmptySystem from "../../ecs/system/emptysystem";

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