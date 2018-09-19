import Logger from "../services/logger";
import Viewport from "./viewport";
import EventManager from "../services/eventmanager";
import PeriodicExecuter from "../services/periodicexecuter";

const TICKS_PER_SECOND = 60;
//delay between each update
const UPDATE_INTERVAL = Math.ceil(1000 / TICKS_PER_SECOND);
export default class Renderer extends Viewport {
  constructor() {
    super();
    this.logger = new Logger(this, "Renderer");
    this.updater = new PeriodicExecuter("Render Loop", UPDATE_INTERVAL, () => this.renderAll());
    this.renderCommands = {};
    this.initListeners();
  }

  initListeners() {
    EventManager.on("render_start", () => {
      this.updater.start();
    });
    EventManager.on("render_stop", () => {
      this.updater.stop();
    });

    EventManager.on("render_command", (index, params) => {
      this.renderCommands[index] = params;
    });

    EventManager.on("render_debug", (json) => {
      this.renderDebug(json);
    });

    EventManager.on("render_all", () => {
      this.renderAll();
    });

  }

  renderAll() {
    this.ctx.save();
    this.backgroundColor("black");
    let i = 0;
    let command = this.renderCommands[i];
    while (command) {
      this.renderCommand(command);
      command = this.renderCommands[++i];
    }
    this.ctx.restore();
  }

  raf() {
    this.renderAll();
    if (this.isRendering)
      requestAnimationFrame(this.raf.bind(this));
  }

  renderCommand(command) {
    this.fillRect(command.color, command.dimensions);
  }

  renderDebug(debugState) {
    let div = document.getElementById("state");
    let str = "";
    for (let [key, value] of Object.entries(debugState))
      str += key + ": " + value + " \n";
    div.innerText = str;
  }

}