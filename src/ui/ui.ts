import Logger from "../services/logger";
import EventManager from "../services/eventmanager";
import RenderCommand from "./rendercommands/rendercommand";
import Canvas from "./canvas";
import InputManager from "./input/inputmanager";


export default class UI extends Canvas {
  logger = new Logger(this, "Renderer");
  inputManager = new InputManager(this);
  renderCommands: { [id: number]: RenderCommand } = {};

  constructor() {
    super();
    EventManager.on("render_debug", (json: any) => {
      this.renderDebug(json);
    });
  }

  renderAll() {
    this.backgroundColor("black");
    let i = 0;
    let command = this.renderCommands[i];
    while (command) {
      command.execute(this.ctx);
      i++;
      command = this.renderCommands[i];
    }
  }

  backgroundColor(color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  renderDebug(debugState: {}) {
    let div = document.getElementById("state");
    let str = "";
    for (let [key, value] of Object.entries(debugState))
      str += key + ": " + value + " \n";
    div!.innerText = str;
  }

}