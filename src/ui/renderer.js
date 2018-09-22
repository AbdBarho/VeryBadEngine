import Logger from "../services/logger";
import Viewport from "./viewport";
import EventManager from "../services/eventmanager";


export default class Renderer extends Viewport {
  constructor() {
    super();
    this.logger = new Logger(this, "Renderer");
    this.renderCommands = {};
    this.isRendering = false;
    this.raf = this.raf.bind(this);
    this.initListeners();
  }

  initListeners() {
    EventManager.on("render_start", () => {
      this.updater.start();
      this.isRendering = true;
    });
    EventManager.on("render_stop", () => {
      this.updater.stop();
      this.isRendering = false;
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
    this.backgroundColor("black");
    let i = 0;
    let command = this.renderCommands[i];
    while (command) {
      this.renderCommand(command);
      command = this.renderCommands[++i];
    }
  }

  raf() {
    this.renderAll();
    if (this.isRendering)
      requestAnimationFrame(this.raf);
  }

  renderCommand(command) {
    this.fillRect(command);
  }

  renderDebug(debugState) {
    let div = document.getElementById("state");
    let str = "";
    for (let [key, value] of Object.entries(debugState))
      str += key + ": " + value + " \n";
    div.innerText = str;
  }

}