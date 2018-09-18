import Engine from "./engine/engine";
import Logger from "./services/logger";
import InputManager from "./services/inputmanager";
import ResizableCanvas from "./engine/resizablecanvas";

export default class Game {
  constructor() {
    this.logger = new Logger(this, "Game");
    this.engine = new Engine();
    this.inputManager = new InputManager();
    this.canvas = new ResizableCanvas();

    //...
  }

  start() {
    this.logger.log(2, "starting...");
    this.engine.start();
    this.logger.log(2, "started");
  }

  stop() {
    this.logger.log(2, "stopping...");
    this.engine.stop();
    this.logger.log(2, "stopped");
  }
}
