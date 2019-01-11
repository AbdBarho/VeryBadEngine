import Canvas from "../../core/canvas";
import InputManager from "../../core/inputManager";
import ECS from "../../ecs/ecs";
import CascadingSystem from "../../ecs/system/cascadingSystem";
import InputSystem from "../../systems/input/input";
import SlowMotion from "../../systems/input/slowMotion";
import ExplosionSystem from "../../systems/movement/explosion";
import KeepInWorld from "../../systems/movement/keepInWorld";
import VelocitySystem from "../../systems/movement/velocity";
import WrapAroundWorld from "../../systems/movement/wrapAroundWorld";
import BackgroundColor from "../../systems/render/background";
import ExplosionRender from "../../systems/render/explosion";
import RectangleRenderer from "../../systems/render/rectangle";
import MouseFollowerController from "./controller";
import ExplosionOnClick from "./explosionOnClick";
import EntityFactory from "./factory";
import MouseFollowerMovementSystem from "./movementSystem";
import StarAnimationRenderer from "./starAnimation";
import MouseFollowerSystem from "./system";

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

      new CascadingSystem([MFMovement, new VelocitySystem()]),
      new CascadingSystem([new KeepInWorld(), new WrapAroundWorld()]),

      new BackgroundColor("#000", this.canvas),
      new StarAnimationRenderer(this.canvas),
      new RectangleRenderer(this.canvas),
      new ExplosionRender(this.canvas, this),
    ];
    //background
    for (let i = 0; i < 100; i++)
      this.queueEntity(EntityFactory.createSideScroller());

    for (let i = 0; i < 100; i++)
      this.queueEntity(EntityFactory.createAnimatedStar());

    //in game followers
    for (let i = 0; i < 600; i++)
      this.queueEntity(EntityFactory.createMouseFollower());
  }
}
