import Logger from "../services/logger";
import PeriodecExecuter from "../services/periodicexecuter";
import EventManager from "../services/eventmanager";
import Config from "../config/config";
import World from "../world/world";
import MouseFollower from "../world/mousefollower/mousefollower";
import AccurateMouseFollower from "../world/mousefollower/accuratemousefollower";

const CONFIG = Config.getConfig("ENGINE");
export default class Engine {
  constructor() {
    this.logger = new Logger(this, "Engine");
    this.world = new World();
    this.updater = new PeriodecExecuter("Update Loop", CONFIG.UPDATE_INTERVAL, this.update, this);

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
    Logger.fps(ms);
  }

  addRandomFollower() {
    let follower = new AccurateMouseFollower();
    let pos = this.world.getRandomPosition();
    follower.setPosition(pos);
    this.world.addObject(follower);
  }
}