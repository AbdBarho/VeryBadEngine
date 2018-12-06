import Canvas from "./core/canvas";
import InputManager from "./core/inputManager";
import ECS from "./ecs/ecs";
import Logger from "./services/logger";
import PeriodicExecuter from "./services/periodicExecuter";
import MouseFollowerLevel from "./levels/mouseFollowerLevel";

export default class Engine {
  level: ECS;
  input: InputManager;
  executer: PeriodicExecuter;
  ui: Canvas;
  isRunning = false;

  constructor() {
    this.ui = new Canvas();
    this.input = new InputManager(this.ui);
    this.level = new MouseFollowerLevel(this.input, this.ui);
    this.executer = new PeriodicExecuter((dt: number) => this.level.update(dt));

    window.addEventListener("keydown", (e) => {
      if (e.code === "Space")
        this.isRunning ? this.stop() : this.start();
    });

    (window as any).requestIdleCallback(() => this.start());
  }

  start() {
    this.level.init();
    this.executer.start();
    this.isRunning = true;
    Logger.debugInfo("isRunning", this.isRunning.toString());
  }

  stop() {
    this.executer.stop();
    this.level.destroy();
    this.isRunning = false;
    Logger.debugInfo("isRunning", this.isRunning.toString());
  }

}
