import EventManager from "../services/eventmanager";
import Logger from "../services/logger";
import PeriodecExecuter from "../services/periodicexecuter";
import Container from "../services/container";

//Engine's "FPS"
const TICKS_PER_SECOND = 60;
//delay between each update
const UPDATE_INTERVAL = Math.ceil(1000 / TICKS_PER_SECOND);

export default class Engine extends EventManager {
  constructor() {
    super();
    this.world = Container.get("World");
    this.renderer = Container.get("Renderer");
    this.logger = new Logger(this, "Engine");
    this.updater = new PeriodecExecuter("Engine Updater", UPDATE_INTERVAL, () => this.update());
  }

  start() {
    this.trigger("beforeStart");
    this.updater.start();
    this.trigger("afterStart");

  }


  update() {
    this.trigger("beforeUpdate");

    this.world.update();
    this.renderer.render();

    this.trigger("afterUpdate");
  }

  stop() {
    this.trigger("beforeStop");
    this.updater.stop();
    this.trigger("afterStop");
  }

}
