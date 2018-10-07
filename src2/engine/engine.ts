import ECS from "../ecs/ecs";
import MovementSystem from "../systems/movement";
import RectangleRenderer from "../systems/reactanglerender";
import PeriodicExecuter from "../services/periodicexecuter";
import BackgroundRenderer from "../systems/background";
import InputManager from "./inputmanager";
import EntityFactory from "../factory/factory";
import Canvas from "./canvas";
import MouseFollowerSystem from "../systems/mousefollower";

export default class Engine extends ECS {
  inputManager: InputManager;
  executer: PeriodicExecuter;
  ui: Canvas;
  constructor() {
    super();
    this.ui = new Canvas();
    this.inputManager = new InputManager(this.ui);
    this.systems = [
      new MouseFollowerSystem(),
      new MovementSystem(),
      new BackgroundRenderer(this.ui),
      new RectangleRenderer(this.ui)
    ];
    this.executer = new PeriodicExecuter(this.update.bind(this));
    for (let i = 0; i < 1000; i++)
      this.addEntity(EntityFactory.createMouseFollower());

    this.executer.start();
    let isRunning = true;
    window.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        if (isRunning) {
          this.executer.stop();
          isRunning = false;
        } else {
          this.executer.start();
          isRunning = true;
        }
      }
    });
  }
}