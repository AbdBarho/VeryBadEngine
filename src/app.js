import Engine from "./engine/engine";
import Renderer from "./ui/renderer";
import InputManager from "./engine/inputmanager";
import EventManager from "./services/eventmanager";

export default class App {
  constructor() {
    this.engine = new Engine();
    this.renderer = new Renderer();
    this.inputManager = new InputManager(this.renderer);
    window.app = this;
    this.isRunning = false;
    EventManager.on("input_keydown", key => {
      if (key === "Space") {
        if (this.isRunning)
          this.stop();
        else
          this.start();
      } else if (key === "Enter") {
        for (let i = 0; i < 10; i++)
          this.engine.addRandomFollower();
      }
    });
  }

  start() {
    this.isRunning = true;
    EventManager.trigger("engine_start");
    EventManager.trigger("render_start");
  }

  stop() {
    this.isRunning = false;
    EventManager.trigger("engine_stop");
    EventManager.trigger("render_stop");
  }
}