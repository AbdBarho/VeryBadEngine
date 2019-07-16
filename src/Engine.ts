import Canvas from "./engine/core/canvas/Canvas";
import InputManager from "./engine/core/Inputmanager";
import Logger from "./engine/services/Logger";
import PeriodicExecuter from "./engine/services/Periodicexecuter";
import WorldManager from "./levels/WorldManager";

export default class Engine {
  worldManager: WorldManager;
  input: InputManager;
  executer: PeriodicExecuter;
  canvas: Canvas;
  isRunning = false;

  constructor() {
    this.canvas = new Canvas();
    this.input = new InputManager(this.canvas);
    this.worldManager = new WorldManager(this.canvas, this.input);
    this.executer = new PeriodicExecuter(async (dt: number) => await this.worldManager.update(dt));

    window.addEventListener("keydown", (e) => {
      if (e.code === "Space")
        this.isRunning ? this.stop(e.ctrlKey) : this.start();
    });

    this.worldManager.init();
  }

  start() {
    this.worldManager.start();
    this.executer.start();
    this.isRunning = true;
    Logger.debugInfo("isRunning", this.isRunning.toString());
  }

  stop(timer: boolean) {
    if (timer)
      this.executer.stop();
    this.worldManager.pause();
    this.isRunning = false;
    Logger.debugInfo("isRunning", this.isRunning.toString());
  }

}
