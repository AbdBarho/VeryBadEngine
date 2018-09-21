import Engine from "./engine/engine";
import Renderer from "./ui/renderer";
import InputManager from "./engine/inputmanager";
import EventManager from "./services/eventmanager";
import Logger from "./services/logger";

export default class App {
  constructor() {
    this.engine = new Engine();
    this.renderer = new Renderer();
    this.inputManager = new InputManager(this.renderer);
    this.isRunning = false;
    EventManager.on("input_keydown_Space", () => this.isRunning ? this.stop() : this.start());
    EventManager.on("input_keydown_Enter", () => {
      for (let i = 0; i < 10; i++)
        this.engine.addRandomFollower();
    });
    EventManager.on("input_keydown_Delete", () => {
      let len = Math.min(10, this.engine.world.getObjects());
      for (let i = 0; i < len; i++)
        this.engine.world.removeObject(0);
    });
  }

  start() {
    this.isRunning = true;
    Logger.debugInfo("isRunning", "true");
    EventManager.trigger("engine_start");
    // EventManager.trigger("render_start");
  }

  stop() {
    this.isRunning = false;
    Logger.debugInfo("isRunning", "false");
    EventManager.trigger("engine_stop");
    // EventManager.trigger("render_stop");
  }
}