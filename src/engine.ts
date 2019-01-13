import Canvas from "./core/Canvas";
import InputManager from "./core/InputManager";
import ECS from "./ecs/ECS";
import MouseFollowerLevel from "./levels/mouseFollower/Level";
import Logger from "./services/Logger";
import PeriodicExecuter from "./services/PeriodicExecuter";
import CONFIG from "./config/Config";

export default class Engine {
  level: ECS;
  input: InputManager;
  executer: PeriodicExecuter;
  canvas: Canvas;
  isRunning = false;

  constructor() {
    this.canvas = new Canvas(CONFIG.CANVAS.WIDTH, CONFIG.CANVAS.HEIGHT);
    this.input = new InputManager(this.canvas);
    this.level = new MouseFollowerLevel(this.input, this.canvas);
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
