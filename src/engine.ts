import ECS from "./ecs/ecs";
import MovementSystem from "./systems/movement/movement";
import RectangleRenderer from "./systems/render/rectangle";
import PeriodicExecuter from "./services/periodicexecuter";
import BackgroundRenderer from "./systems/render/background";
import InputManager from "./core/inputmanager";
import EntityFactory from "./factory/factory";
import Canvas from "./core/canvas";
import MouseFollowerSystem from "./systems/mousefollower";
import InputSystem from "./systems/input/input";
import Logger from "./services/logger";
import KeepInWorld from "./systems/movement/keepinworld";
import ExplosionSystem from "./systems/explosion";
import ExplosionOnClick from "./systems/input/explosiononclick";
import WrapAroundWorld from "./systems/movement/wraparoundworld";
import MouseFollowerController from "./systems/input/mousefollowercontroller";
import CirclePlot from "./systems/render/circleplot";

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
    this.executer = new PeriodicExecuter((dt: number) => this.ecs.update(dt));
    this.init();
  }

  init() {
    this.createSystems();
    for (let i = 0; i < 100; i++)
      this.ecs.queueEntity(EntityFactory.createSideScroller());

    for (let i = 0; i < 500; i++)
      this.ecs.queueEntity(EntityFactory.createMouseFollower());

    window.addEventListener("keydown", (e) => {
      if (e.code === "Space")
        this.isRunning ? this.stop() : this.start();
    });
    this.start();
  }

  createSystems() {
    let mousefollowerSys = new MouseFollowerSystem(this.input, this.ecs);
    this.ecs.systems = [
      new InputSystem(this.input),

      new ExplosionSystem(this.ecs),
      new ExplosionOnClick(this.input, this.ecs),

      new MouseFollowerController(this.input, this.ecs, mousefollowerSys),
      mousefollowerSys,

      new MovementSystem(),
      new KeepInWorld(),
      new WrapAroundWorld(),

      new BackgroundRenderer(this.ui),
      new RectangleRenderer(this.ui),
      // new CirclePlot(this.ui)
    ];
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