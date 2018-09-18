import Engine from "./engine/engine";
import InputManager from "./engine/inputmanager";
import Viewport from "./engine/viewport";
import Logger from "./services/logger";
import Renderer from "./engine/renderer";
import TwoDimensionalWorld from "./world/2dworld";
import MouseFollower from "./world/mousefollower";

export default class Game {
  constructor() {
    this.logger = new Logger(this, "Game");
    this.world = new TwoDimensionalWorld();

    this.viewPort = new Viewport();
    this.renderer = new Renderer();
    this.engine = new Engine();

    this.inputManager = new InputManager();

    //...
  }

  start() {
    this.logger.log(2, "starting...");
    this.engine.start();
    this.logger.log(2, "started");
    this.world.addObject(new MouseFollower());
  }

  stop() {
    this.logger.log(2, "stopping...");
    this.engine.stop();
    this.logger.log(2, "stopped");
  }
}
