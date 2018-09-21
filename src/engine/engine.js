import Logger from "../services/logger";
import MouseFollower from "../world/mousefollower/mousefollower";
import TwoDimensionalWorld from "../world/2d/2dworld";
import PeriodecExecuter from "../services/periodicexecuter";
import EventManager from "../services/eventmanager";

//Engine's "FPS"
const TICKS_PER_SECOND = 60;
//delay between each update
const UPDATE_INTERVAL = Math.ceil(1000 / TICKS_PER_SECOND);


export default class Engine {
  constructor() {
    this.logger = new Logger(this, "Engine");
    this.world = new TwoDimensionalWorld();
    this.updater = new PeriodecExecuter("Update Loop", UPDATE_INTERVAL, () => this.update());
    this.initListeners();
  }

  initListeners() {
    EventManager.on("engine_start", () => this.updater.start());
    EventManager.on("engine_stop", () => this.updater.stop());
  }


  update() {
    this.world.getObjects().forEach((obj, i) => {
      let renderCommand = obj.update();
      EventManager.trigger("render_command", i, renderCommand);
    });
    EventManager.trigger("render_all");
  }

  addRandomFollower() {
    let follower = new MouseFollower();
    let pos = this.world.getRandomPosition();
    follower.setPosition(pos);
    this.world.addObject(follower);
  }
}