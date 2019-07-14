import Canvas from "../../engine/core/canvas/Canvas";
import InputManager from "../../engine/core/Inputmanager";
import ECS from "../../engine/ecs/ECS";
import CascadingSystem from "../../engine/ecs/system/CascadingSystem";
import MathHelper from "../../engine/math/Math";
import InputSystem from "../../engine/systems/input/InputSystem";
import SlowMotion from "../../engine/systems/input/SlowMotion";
import KeepInWorld from "../../engine/systems/movement/KeepInWorld";
import VelocitySystem from "../../engine/systems/movement/Velocity";
import WrapAroundWorld from "../../engine/systems/movement/WrapAroundWorld";
import ExplosionRender from "../../engine/systems/render/ExplosionRender";
import GradientRenderer from "../../engine/systems/render/GradientRender";
import RectangleRenderer from "../../engine/systems/render/RectangleRender";
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

      // new BackgroundColor(0, "#000", this.canvas, false),
      new GradientRenderer(layer0),
      new StarAnimationRenderer(layer0),
      new RectangleRenderer(layer0),
      new ExplosionRender(layer0, this),

    ];
    //background

    this.queueEntity(Factory.createRotatingGradient(MathHelper.getRandomInt(360), 0.01, "min", "center", "center", {
      0: "#400a",
      100: "#004a"
    }));

    this.queueEntity(Factory.createRotatingGradient(-90, -0.012, "min", "right", "top", {
      50: "#0000",
      100: "#0006"
    }));
    for (let i = 0; i < 100; i++)
      this.queueEntity(Factory.createSideScroller());

    for (let i = 0; i < 100; i++)
      this.queueEntity(Factory.createAnimatedStar());

    // //in game followers
    for (let i = 0; i < 100; i++)
      this.queueEntity(Factory.createMouseFollower());

    // 1000, 5000 => 30 fps

  }
}
