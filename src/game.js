import Engine from "./engine/engine";
import InputManager from "./engine/inputmanager";
import Viewport from "./engine/viewport";
import Logger from "./services/logger";

export default class Game {
  constructor() {
    this.logger = new Logger(this, "Game");
    this.engine = new Engine();
    this.viewPort = new Viewport();
    this.inputManager = new InputManager(this.viewPort);

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
