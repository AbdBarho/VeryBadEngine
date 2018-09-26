import UI from "./ui/ui";
import EventManager from "./services/eventmanager";
import Logger from "./services/logger";
import Config from "./config/config";
import World from "./world/world";
import MouseFollower from "./objects/mousefollower/mousefollower";
import AccurateMouseFollower from "./objects/mousefollower/accuratemousefollower";
import FillRect from "./ui/rendercommands/fillrect";
import RequestAnimationFrameExecuter from "./services/rafexecuter";

const CONFIG = Config.getConfig("ENGINE");

export default class Engine extends RequestAnimationFrameExecuter {
  world = new World();
  renderer = new UI();
  isRunning = false;
  lastTime = 0;

  constructor() {
    super("Engine Loop");
    EventManager.on("input_keydown_Space", () => this.isRunning ? this.stop() : this.start(CONFIG.UPDATE_INTERVAL));
    EventManager.on("input_keydown_Enter", () => {
      for (let i = 0; i < 10; i++)
        this.addRandomFollower();
    });
    EventManager.on("input_keydown_Delete", () => {
      let len = Math.min(10, this.world.getObjects().length);
      for (let i = 0; i < len; i++)
        this.deleteRandomFollower()
    });
  }

  beforeStart() {
    this.isRunning = true;
    Logger.debugInfo("isRunning", "true");
  }

  execute(dt: number) {
    Logger.fps(dt);
    dt /= CONFIG.TIME_SCALE;
    this.world.updateAll(dt);
    this.renderer.renderAll();
  }

  afterStop() {
    this.isRunning = false;
    Logger.debugInfo("isRunning", "false");
  }


  addRandomFollower() {
    let follower = new AccurateMouseFollower();
    let pos = this.world.getRandomPosition();
    follower.setPosition(pos);
    let id = this.world.addObject(follower);
    this.renderer.renderCommands[id] = new FillRect(follower, this.renderer.parameters);
  }

  deleteRandomFollower() {
    let id = this.world.removeLastObject();
    delete this.renderer.renderCommands[id]
  }
}