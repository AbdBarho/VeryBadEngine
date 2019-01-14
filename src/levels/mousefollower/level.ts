import Canvas from "../../core/Canvas";
import InputManager from "../../core/InputManager";
import ECS from "../../ecs/ECS";
import CascadingSystem from "../../ecs/system/CascadingSystem";
import Update from "../../ecs/system/Update";
import InputSystem from "../../systems/input/InputSystem";
import SlowMotion from "../../systems/input/SlowMotion";
import ExplosionDetection from "./ExplosionDetection";
import KeepInWorld from "../../systems/movement/KeepInWorld";
import VelocitySystem from "../../systems/movement/Velocity";
import WrapAroundWorld from "../../systems/movement/WrapAroundWorld";
import BackgroundColor from "../../systems/render/Background";
import ExplosionRender from "../../systems/render/ExplosionRender";
import RectangleRenderer from "../../systems/render/RectangleRender";
import ExplosionOnClick from "./ExplosionOnClick";
import Factory from "./Factory";
import MouseFollowerController from "./MouseFollowerController";
import MouseFollowerSystem from "./MouseFollowerSystem";
import MouseFollowerMovementSystem from "./MovementSystem";
import StarAnimationRenderer from "./StarAnimationRender";

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
    // let layer1 = this.canvas.getLayer(1);
    // let layer2 = this.canvas.getLayer(2);
    this.systems = [
      new InputSystem(this.input),
      new SlowMotion(this, this.input),

      new ExplosionDetection(),
      new ExplosionOnClick(this.input, this),

      new MouseFollowerController(this.input, this, MFSys, MFMovement),
      MFSys,

      new CascadingSystem("CascadingMovement", [MFMovement, new VelocitySystem()]),

      new KeepInWorld(),
      new WrapAroundWorld(),

      new BackgroundColor(0, "#002", this.canvas, false),
      new StarAnimationRenderer(0, this.canvas),
      new RectangleRenderer(0, this.canvas),
      new ExplosionRender(0, this.canvas, this),

    ];
    //background
    for (let i = 0; i < 100; i++)
      this.queueEntity(Factory.createSideScroller());

    for (let i = 0; i < 100; i++)
      this.queueEntity(Factory.createAnimatedStar());

    //in game followers
    for (let i = 0; i < 1000; i++)
      this.queueEntity(Factory.createMouseFollower());

    // 10000, Vector, 20.97fps
    // 10000, Vec2, 26.58fps
  }
}
