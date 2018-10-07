import System from "../ecs/system";
import InputManager from "../engine/inputmanager";

export default class InputSystem extends System {
  inputManager: InputManager;
  constructor(inputManager: InputManager) {
    super([]);
    this.inputManager = inputManager;
  }

  update() {
    this.inputManager.executeQueue();
  }
}