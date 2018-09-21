import Logger from "../services/logger";
import MouseFollower from "../world/mousefollower/mousefollower";
import TwoDimensionalWorld from "../world/2d/2dworld";
import PeriodecExecuter from "../services/periodicexecuter";
import EventManager from "../services/eventmanager";
import Config from "../config/config";
import AccurateMouseFollower from "../world/mousefollower/accuratemousefollower";

export default class Engine {
  constructor() {
    this.logger = new Logger(this, "Engine");
    this.world = new TwoDimensionalWorld();
    this.updater = new PeriodecExecuter("Update Loop", Config.getUpdateInterval(), this.update.bind(this));
    this.initListeners();
  }

  initListeners() {
    EventManager.on("engine_start", () => this.updater.start());
    EventManager.on("engine_stop", () => this.updater.stop());
  }

  /**
   * @param {Number} ms milliseonds since last update
   */
  update(ms) {
    this.world.getObjects().forEach((obj, i) => {
      obj.triggerUpdate(ms);
      EventManager.trigger("render_command", i, obj.getRenderingCommand());
    });
    EventManager.trigger("render_all");
  }

  addRandomFollower() {
    let follower = new AccurateMouseFollower();
    let pos = this.world.getRandomPosition();
    follower.setPosition(pos);
    this.world.addObject(follower);
  }
}