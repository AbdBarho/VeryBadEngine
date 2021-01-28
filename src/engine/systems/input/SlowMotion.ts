import { InputProvider } from "../../Inputmanager";
import ECS from "../../ecs/ECS";
import EmptySystem from "../../ecs/system/Emptysystem";

export default class SlowMotion extends EmptySystem {
  ecs: ECS;
  inputManager: InputProvider;
  scale: number;
  constructor(ecs: ECS, inputManager: InputProvider, scale: number) {
    super("SlowMotion");
    this.ecs = ecs;
    this.inputManager = inputManager;
    this.scale = scale;
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
