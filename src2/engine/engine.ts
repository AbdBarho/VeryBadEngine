import ECS from "../ecs/ecs";
import MovementSystem from "../systems/movement";
import RectangleRenderer from "../systems/rectanglerender";
import PeriodicExecuter from "../services/periodicexecuter";
import BackgroundRenderer from "../systems/background";
import InputManager from "./inputmanager";
import EntityFactory from "../factory/factory";
import Canvas from "./canvas";
import MouseFollowerSystem from "../systems/mousefollower";
import InputSystem from "../systems/input";
import Logger from "../services/logger";
import KeepInWorld from "../systems/keepinworld";
import ExplosionSystem from "../systems/explosion";
import ExplosionOnClick from "../systems/explosiononclick";
import WrapAroundWorld from "../systems/wraparoundworld";

export default class Engine {
  ecs: ECS;
  input: InputManager;
  executer: PeriodicExecuter;
  ui: Canvas;
  isRunning = false;

  constructor() {
    this.ui = new Canvas();
    this.input = new InputManager(this.ui);
    this.ecs = new ECS();
    this.ecs.systems = [
      new InputSystem(this.input),

      new ExplosionSystem(),
      new ExplosionOnClick(this.input, this.ecs),

      new MouseFollowerSystem(this.input, this.ecs),


      new MovementSystem(),
      new KeepInWorld(),
      new WrapAroundWorld(),

      new BackgroundRenderer(this.ui),
      new RectangleRenderer(this.ui)
    ];
    this.executer = new PeriodicExecuter((dt: number) => this.ecs.update(dt));
    for (let i = 0; i < 500; i++)
    this.ecs.queueEntity(EntityFactory.createMouseFollower());
    // this.ecs.queueEntity(EntityFactory.createSideScroller());

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