import ECS from "../ecs/ecs";
import InputManager from "../core/inputManager";
import Canvas from "../core/canvas";
import MouseFollowerSystem from "./systems/mouseFollowerSystem";
import InputSystem from "../systems/input/input";
import SlowMotion from "../systems/input/slowMotion";
import ExplosionSystem from "../systems/movement/explosion";
import ExplosionOnClick from "../systems/input/explosionOnClick";
import MouseFollowerController from "./systems/mouseFollowerController";
import MovementSystem from "../systems/movement/movement";
import KeepInWorld from "../systems/movement/keepInWorld";
import WrapAroundWorld from "../systems/movement/wrapAroundWorld";
import BackgroundColor from "../systems/render/background";
import RectangleRenderer from "../systems/render/rectangle";
import ExplosionRender from "../systems/render/explosion";
import EntityFactory from "../factory/factory";
import MouseFollowerMovementSystem from "./systems/mouseFollowerMovementSystem";
import CascadingSystem from "../ecs/system/cascadingSystem";

export default class MouseFollowerLevel extends ECS {
  input: InputManager;
  ui: Canvas;
  constructor(input: InputManager, ui: Canvas) {
    super();
    this.input = input;
    this.ui = ui;
    //create systems
    let MFSys = new MouseFollowerSystem(this.input, this);
    let MFMovement = new MouseFollowerMovementSystem();
    this.systems = [
      new InputSystem(this.input),
      new SlowMotion(this, this.input),

      new ExplosionSystem(),
      new ExplosionOnClick(this.input, this),

      new MouseFollowerController(this.input, this, MFSys, MFMovement),
      MFSys,

      new CascadingSystem([MFMovement, new MovementSystem()]),
      new KeepInWorld(),
      new WrapAroundWorld(),

      new BackgroundColor("#111", this.ui),
      new RectangleRenderer(this.ui),
      new ExplosionRender(this.ui, this)
    ];
    //background
    for (let i = 0; i < 100; i++)
      this.queueEntity(EntityFactory.createSideScroller());

    //in game followers
    for (let i = 0; i < 500; i++)
      this.queueEntity(EntityFactory.createMouseFollower());
  }
}
