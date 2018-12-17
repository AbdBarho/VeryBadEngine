import Canvas from "./core/canvas";
import InputManager from "./core/inputManager";
import ECS from "./ecs/ecs";
import MouseFollowerLevel from "./levels/mousefollower/level";
import Logger from "./services/logger";
import PeriodicExecuter from "./services/periodicExecuter";
import Portfolio from "./levels/portfolio/level";

export default class Engine {
  level: ECS;
  input: InputManager;
  executer: PeriodicExecuter;
  canvas: Canvas;
  isRunning = false;

  constructor() {
    this.canvas = new Canvas();
    this.input = new InputManager(this.canvas);
    this.level = new MouseFollowerLevel(this.input, this.canvas);
    // this.level = new Portfolio(this.input, this.canvas);
    this.executer = new PeriodicExecuter((dt: number) => this.level.update(dt));

    window.addEventListener("keydown", (e) => {
      if (e.code === "Space")
        this.isRunning ? this.stop() : this.start();
    });
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
