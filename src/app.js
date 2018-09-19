import Engine from "./engine/engine";
import Renderer from "./ui/renderer";
import InputManager from "./engine/inputmanager";
import EventManger from "./services/eventmanager";

export default class App {
  constructor() {
    this.engine = new Engine();
    this.renderer = new Renderer();
    this.inputManager = new InputManager(this.renderer);
  }

  start() {
    for (let i = 0; i < 100; i++)
      this.engine.addRandomFollower();
    EventManger.trigger("engine_start");
    EventManger.trigger("render_start");
  }
}