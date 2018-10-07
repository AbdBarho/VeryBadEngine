import ECS from "../ecs/ecs";
import MovementSystem from "../systems/movement";
import RectangleRenderer from "../systems/reactanglerender";
import PeriodicExecuter from "../services/periodicexecuter";
import BackgroundRenderer from "../systems/background";
import InputManager from "./inputmanager";
import EntityFactory from "../factory/factory";
import Canvas from "./canvas";
import MouseFollowerSystem from "../systems/mousefollower";
import InputSystem from "../systems/input";
import Logger from "../services/logger";

export default class Engine extends ECS {
  input: InputManager;
  executer: PeriodicExecuter;
  ui: Canvas;
  isRunning = false;

  constructor() {
    super();
    this.ui = new Canvas();
    this.input = new InputManager(this.ui);
    this.systems = [
      new InputSystem(this.input),
      new MouseFollowerSystem(this.input),
      new MovementSystem(),
      new BackgroundRenderer(this.ui),
      new RectangleRenderer(this.ui)
    ];
    this.executer = new PeriodicExecuter(this.update.bind(this));
    for (let i = 0; i < 100; i++)
      this.addEntity(EntityFactory.createMouseFollower());

    window.addEventListener("keydown", (e) => {
      if (e.code === "Space")
        this.isRunning ? this.stop() : this.start();
    });
    this.start();
  }

  start() {
    this.executer.start();
    this.isRunning = true;
    Logger.debugInfo("isRunning", this.isRunning.toString());
  }

  stop() {
    this.executer.stop();
    this.isRunning = false;
    Logger.debugInfo("isRunning", this.isRunning.toString());
  }
}