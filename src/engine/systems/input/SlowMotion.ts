import InputManager from "../../core/Inputmanager";
import ECS from "../../ecs/ECS";
import EmptySystem from "../../ecs/system/Emptysystem";
import Update from "../../ecs/system/Update";

export default class SlowMotion extends EmptySystem {
  ecs: ECS;
  inputManager: InputManager;
  currentScale: number;
  targetScale: number;
  scale: number;
  constructor(ecs: ECS, inputManager: InputManager, scale: number) {
    super("SlowMotion", Update.every);
    this.ecs = ecs;
    this.inputManager = inputManager;
    this.scale = scale;
    this.currentScale = this.ecs.timeScale;
    this.targetScale = this.ecs.timeScale;
  }

  init() {
    this.inputManager.onKey("mousedown", this.slow, this);
    this.inputManager.onKey("mouseup", this.restore, this);
  }

  slow(key: string) {
    if (key === "Mouse3")
      this.ecs.timeScale = this.scale;
  }

  restore(key: string) {
    if (key === "Mouse3")
      this.ecs.timeScale = 1;
  }

  destroy() {
    this.inputManager.off("mousedown", this.slow);
    this.inputManager.off("mouseup", this.restore);
  }
}
