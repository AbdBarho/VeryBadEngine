import Engine from "./engine/engine";
import InputManager from "./engine/inputmanager";
import Viewport from "./engine/viewport";
import Logger from "./services/logger";
import Renderer from "./engine/renderer";
import MouseFollower from "./world/2d/mousefollower";
import TwoDimensionalWorld from "./world/2d/2dworld";


export default class Game {
  constructor() {
    this.logger = new Logger(this, "Game");

    this.world = new TwoDimensionalWorld();

    this.viewPort = new Viewport();
    this.renderer = new Renderer();

    this.engine = new Engine();

    this.inputManager = new InputManager();
  }

  start() {
    this.logger.log(2, "starting...");
    // for (let i = 0; i < 4000; i++)
      this.addRandomFollower();
    this.engine.start();
    this.logger.log(2, "started");
  }

  stop() {
    this.logger.log(2, "stopping...");
    this.engine.stop();
    this.logger.log(2, "stopped");
  }

  addRandomFollower() {
    let follower = new MouseFollower();
    let pos = this.world.getRandomPosition();
    follower.setPosition(pos.x, pos.y);
    this.world.addObject(follower);
  }
}
