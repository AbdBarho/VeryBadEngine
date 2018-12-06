import InputManager from "../../core/inputManager";
import ECS from "../../ecs/ecs";
import EmptySystem from "../../ecs/system/emptySystem";

export default class SlowMotion extends EmptySystem {
  ecs: ECS;
  inputManager: InputManager;
  currentScale: number;
  targetScale: number;
  constructor(ecs: ECS, inputManager: InputManager) {
    super();
    this.ecs = ecs;
    this.inputManager = inputManager;
    this.currentScale = this.ecs.timeScale;
    this.targetScale = this.ecs.timeScale;
  }

  init() {
    this.inputManager.onKey("mousedown", this.slow, this);
    this.inputManager.onKey("mouseup", this.restore, this);
  }

  slow(key: string) {
    if (key === "Mouse3") {
      this.ecs.timeScale = 0.25;
    }
  }

  restore(key: string) {
    if (key === "Mouse3") {
      this.ecs.timeScale = 1;
    }
  }

  destroy() {
    this.inputManager.off("mousedown", this.slow);
    this.inputManager.off("mouseup", this.restore);
  }
}
