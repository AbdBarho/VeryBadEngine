import Canvas from "./engine/Canvas";
import InputManager from "./engine/Inputmanager";
import Logger from "./engine/services/Logger";
import PeriodicExecuter from "./engine/services/Periodicexecuter";
import MouseFollowerLevel from "./levels/mousefollower/Level";
import World from "./levels/WorldManager";

export default class Engine {
  worldManager: World;
  input: InputManager;
  executer: PeriodicExecuter;
  canvas: Canvas;
  isRunning = false;

  constructor() {
    this.canvas = new Canvas();
    this.input = new InputManager(this.canvas);
    this.worldManager = new World(this.canvas, this.input, [
      MouseFollowerLevel
    ]);
    this.executer = new PeriodicExecuter(async (dt: number) => this.worldManager.update(dt));

    window.addEventListener("keydown", (e) => {
      if (e.code === "Space")
        this.isRunning ? this.stop() : this.start();
    });
  }

  start() {
    this.worldManager.start();
    this.executer.start();
    this.isRunning = true;
    Logger.debugInfo("isRunning", this.isRunning.toString());
  }

  stop() {
    this.executer.stop();
    this.worldManager.pause();
    this.isRunning = false;
    Logger.debugInfo("isRunning", this.isRunning.toString());
  }

}
