import Canvas from "../../core/Canvas";
import InputManager from "../../core/InputManager";
import ECS from "../../ecs/ECS";
import CascadingSystem from "../../ecs/system/CascadingSystem";
import InputSystem from "../../systems/input/InputSystem";
import SlowMotion from "../../systems/input/SlowMotion";
import KeepInWorld from "../../systems/movement/KeepInWorld";
import VelocitySystem from "../../systems/movement/Velocity";
import WrapAroundWorld from "../../systems/movement/WrapAroundWorld";
import ExplosionRender from "../../systems/render/ExplosionRender";
import RectangleRenderer from "../../systems/render/RectangleRender";
import RotatingLinearGradient, { GradientConfig } from "../../systems/render/RotatingGradient";
import ExplosionDetection from "./ExplosionDetection";
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
    let canvasConfig: GradientConfig = { start: 0, speed: 0.01, stops: {
        0: "#9005",
        50: "#1015",
        100: "#0095"
      }
    };
    let MFSys = new MouseFollowerSystem(this.input, this);
    let MFMovement = new MouseFollowerMovementSystem();
    let layer0 = this.canvas.getLayer(0);
    this.systems = [
      new InputSystem(this.input),
      new SlowMotion(this, this.input, .15),

      new ExplosionDetection(),
      new ExplosionOnClick(this.input, this),

      new MouseFollowerController(this.input, this, MFSys, MFMovement),
      MFSys,

      new CascadingSystem("CascadingMovement", [MFMovement, new VelocitySystem()]),

      new KeepInWorld(),
      new WrapAroundWorld(),

      new RotatingLinearGradient(layer0, canvasConfig),
      new StarAnimationRenderer(layer0),
      new RectangleRenderer(layer0),
      new ExplosionRender(layer0, this),

    ];
    //background
    for (let i = 0; i < 100; i++)
      this.queueEntity(Factory.createSideScroller());

    for (let i = 0; i < 100; i++)
      this.queueEntity(Factory.createAnimatedStar());

    //in game followers
    for (let i = 0; i < 700; i++)
      this.queueEntity(Factory.createMouseFollower());

  }
}
