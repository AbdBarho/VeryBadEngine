import Frame from '../../engine/core/canvas/layers/Frame';
import { InputProvider } from "../../engine/core/Inputmanager";
import ECS from "../../engine/ecs/ECS";
import CascadingSystem from "../../engine/ecs/system/CascadingSystem";
import MathHelper from "../../engine/math/Math";
import SlowMotion from "../../engine/systems/input/SlowMotion";
import VelocitySystem from "../../engine/systems/movement/Velocity";
import ExplosionRender from "../../engine/systems/render/ExplosionRender";
import FlushBuffer from "../../engine/systems/render/FlushBuffer";
import GradientRenderer from "../../engine/systems/render/GradientRender";
import RectangleRenderer from "../../engine/systems/render/RectangleRender";
import ExplosionDetection from "./ExplosionDetection";
import ExplosionOnClick from "./ExplosionOnClick";
import Factory from "./Factory";
import KeepInWorld from "./KeepInWorld";
import MouseFollowerController from "./MouseFollowerController";
import MouseFollowerSystem from "./MouseFollowerSystem";
import MouseFollowerMovementSystem from "./MovementSystem";
import StarAnimationRenderer from "./StarAnimationRender";
import WrapAroundWorld from "./WrapAroundWorld";

export default class MouseFollowerLevel extends ECS {
  input: InputProvider;
  canvas: OffscreenCanvas;
  constructor(input: InputProvider, canvas: OffscreenCanvas) {
  // constructor(input: InputManager) {
    super();
    this.input = input;
    this.canvas = canvas;

    //create systems
    let MFSys = new MouseFollowerSystem(this.input, this);
    let MFMovement = new MouseFollowerMovementSystem();
    const frame = new Frame();
    this.systems = [
      // new InputSystem(this.input),
      new SlowMotion(this, this.input, .12),

      new ExplosionDetection(),
      new ExplosionOnClick(this.input, this),

      new MouseFollowerController(this.input, this, MFSys, MFMovement),
      MFSys,

      new CascadingSystem("CascadingMovement", [MFMovement, new VelocitySystem()]),

      new KeepInWorld(),
      new WrapAroundWorld(),

      // new BackgroundColor(frame, '#111'),
      new GradientRenderer(frame),
      new StarAnimationRenderer(frame),
      new RectangleRenderer(frame),
      new ExplosionRender(frame, this),

      //Flush buffer
      new FlushBuffer(this.canvas, [frame])

    ];
    //background

    this.queueEntity(Factory.createRotatingGradient(MathHelper.getRandomInt(360), 0.05, "min", "center", "center", {
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
    for (let i = 0; i < 500; i++)
      this.queueEntity(Factory.createMouseFollower());


    this.init();

  }
}
