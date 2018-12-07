import Canvas from "../core/canvas";
import InputManager from "../core/inputManager";
import ECS from "../ecs/ecs";
import CascadingSystem from "../ecs/system/cascadingSystem";
import EntityFactory from "../factory/factory";
import ExplosionOnClick from "../systems/input/explosionOnClick";
import InputSystem from "../systems/input/input";
import SlowMotion from "../systems/input/slowMotion";
import ExplosionSystem from "../systems/movement/explosion";
import KeepInWorld from "../systems/movement/keepInWorld";
import MovementSystem from "../systems/movement/movement";
import WrapAroundWorld from "../systems/movement/wrapAroundWorld";
import BackgroundColor from "../systems/render/background";
import ExplosionRender from "../systems/render/explosion";
import RectangleRenderer from "../systems/render/rectangle";
import MouseFollowerController from "./systems/mouseFollowerController";
import MouseFollowerMovementSystem from "./systems/mouseFollowerMovementSystem";
import MouseFollowerSystem from "./systems/mouseFollowerSystem";

export default class MouseFollowerLevel extends ECS {
  input: InputManager;
  canvas: Canvas;
  constructor(input: InputManager, canvas: Canvas) {
    super();
    this.input = input;
    this.canvas = canvas;
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
      new CascadingSystem([new KeepInWorld(), new WrapAroundWorld()]),

      new BackgroundColor("#000", this.canvas),
      new RectangleRenderer(this.canvas),
      new ExplosionRender(this.canvas, this)
    ];
    //background
    for (let i = 0; i < 100; i++)
      this.queueEntity(EntityFactory.createSideScroller());

    //in game followers
    for (let i = 0; i < 500; i++)
      this.queueEntity(EntityFactory.createMouseFollower());
  }
}
