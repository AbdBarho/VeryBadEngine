import Logger from "../services/logger";
import Viewport from "./viewport";
import EventManager from "../services/eventmanager";
import RenderCommand from "./rendercommands/rendercommand";


export default class Renderer extends Viewport {
  logger = new Logger(this, "Renderer");
  renderCommands: { [id: number]: RenderCommand } = {};
  isRendering = false;

  constructor() {
    super();

    EventManager.on("render_start", () => { });
    EventManager.on("render_stop", () => { });

    EventManager.on("render_command", (index: number, command: RenderCommand) => {
      if (command)
        this.renderCommands[index] = command.scaleAndShift(this.parameters.SCALE);
      else
        delete this.renderCommands[index];
    });

    EventManager.on("render_debug", (json: any) => {
      this.renderDebug(json);
    });

    EventManager.on("render_all", () => {
      this.renderAll();
    });
  }

  renderAll() {
    this.backgroundColor("black");
    let i = 0;
    for (let i in this.renderCommands) {
      let command = this.renderCommands[i];
      command && command.execute(this.ctx);
    }
  }

  raf() {
    this.renderAll();
    if (this.isRendering)
      requestAnimationFrame(this.raf);
  }
  renderDebug(debugState: {}) {
    let div = document.getElementById("state");
    let str = "";
    for (let [key, value] of Object.entries(debugState))
      str += key + ": " + value + " \n";
    div!.innerText = str;
  }

}