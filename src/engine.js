import EventManager from "./eventmanager";
import Logger from "./logger";
import PeriodecExecuter from "./periodicexecuter";

//Engine's "FPS"
const TICKS_PER_SECOND = 60;
//delay between each update
const UPDATE_INTERVAL = Math.ceil(1000 / TICKS_PER_SECOND);

export default class Engine extends EventManager {
  constructor() {
    super();
    this.logger = new Logger(this, "Engine");
    this.updater = new PeriodecExecuter("Engine Updater", UPDATE_INTERVAL, this.update.bind(this));
  }

  start() {
    this.trigger("beforeStart");
    this.updater.start();
    this.trigger("afterStart");

  }


  update() {}

  stop() {
    this.trigger("beforeStop");
    this.updater.stop();
    this.trigger("afterStop");
  }

}
