import InputManager from "./engine/inputmanager";
import Viewport from "./engine/viewport";
import Logger from "./services/logger";
import Renderer from "./engine/renderer";
import MouseFollower from "./world/2d/mousefollower";
import TwoDimensionalWorld from "./world/2d/2dworld";
import PeriodecExecuter from "./services/periodicexecuter";

//Engine's "FPS"
const TICKS_PER_SECOND = 60;
//delay between each update
const UPDATE_INTERVAL = Math.ceil(1000 / TICKS_PER_SECOND);


export default class Engine {
  constructor() {
    this.logger = new Logger(this, "Game");

    this.world = new TwoDimensionalWorld();

    this.viewPort = new Viewport();
    this.renderer = new Renderer();

    this.inputManager = new InputManager();

    this.updater = new PeriodecExecuter("Update Loop", UPDATE_INTERVAL, () => this.update());
  }

  start() {
    this.logger.log(2, "starting...");
    for (let i = 0; i < 100; i++)
      this.addRandomFollower();
    this.logger.log(2, "started");
    this.updater.start();
  }

  update() {
    this.world.update();
    this.renderer.render();
  }

  stop() {
    this.logger.log(2, "stopping...");
    this.updater.stop();
    this.logger.log(2, "stopped");
  }

  addRandomFollower() {
    let follower = new MouseFollower();
    let pos = this.world.getRandomPosition();
    follower.setPosition(pos);
    this.world.addObject(follower);
  }
}
