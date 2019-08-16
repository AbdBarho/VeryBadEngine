import Frame from '../../engine/core/canvas/layers/Frame';
import { InputProvider } from "../../engine/core/Inputmanager";
import ECS from "../../engine/ecs/ECS";
import MathHelper from "../../engine/math/Math";
import VelocitySystem from "../../engine/systems/movement/Velocity";
import ExplosionRender from "../../engine/systems/render/ExplosionRender";
import FlushBuffer from "../../engine/systems/render/FlushBuffer";
import RectangleRenderer from "../../engine/systems/render/RectangleRender";
import MouseFollowerWorker from "./LevelWorker";
import Factory from "./services/Factory";
import ExplosionDetection from "./systems/ExplosionDetection";
import GradientRenderer from "./systems/GradientRender";
import InputSystem from "./systems/InputSystem";
import MouseFollowerSystem from "./systems/MouseFollowerSystem";
import MouseFollowerMovementSystem from "./systems/MovementSystem";
import StarAnimationRenderer from "./systems/StarAnimationRender";
import WrapAroundWorld from "./systems/WrapAroundWorld";
import Config from './Config';

export default class MouseFollowerLevel extends ECS {
  input: InputProvider;
  canvas: OffscreenCanvas;
  worker: MouseFollowerWorker;
  frames: Frame[] = [new Frame()];

  constructor(worker: MouseFollowerWorker) {
  // constructor(input: InputManager) {
    super();
    this.worker = worker;
    this.input = worker.input;
    this.canvas = worker.canvas!;

    //create systems
    let MFSys = new MouseFollowerSystem(this.input, this);
    let MFMovement = new MouseFollowerMovementSystem();
    const frame = this.frames[0];
    this.systems = [
      new InputSystem(this.input, this, MFSys, MFMovement),

      //background elements can be updated and rendered directly
      // new BackgroundColor(frame, '#111'),
      new GradientRenderer(frame),

      new ExplosionDetection(),

      new VelocitySystem(),


      MFSys,
      MFMovement,
      new WrapAroundWorld(),

      // new KeepInWorld(),

      new StarAnimationRenderer(frame),
      new RectangleRenderer(frame),
      new ExplosionRender(frame, this),

      //Flush buffer
      new FlushBuffer(this.canvas, [frame])

    ];

    //background
    this.queueEntity(Factory.createRotatingGradient(Config.WORLD.SIZE,
      MathHelper.getRandomInt(360), 0.05, "min", "center", "center", {
        0: "#400a",
        100: "#004a"
      })
    );

    this.queueEntity(Factory.createRotatingGradient(Config.WORLD.SIZE,
      -90, -0.012, "min", "right", "top", {
        50: "#0000",
        100: "#0006"
      })
    );

    for (let i = 0; i < 100; i++)
      this.queueEntity(Factory.createSideScroller());

    for (let i = 0; i < 100; i++)
      this.queueEntity(Factory.createAnimatedStar());

    for (let i = 0; i < 500; i++)
      this.queueEntity(Factory.createMouseFollower());


    this.init();

  }

  drawLastFrame() {
    const context = this.canvas.getContext("2d") as OffscreenCanvasRenderingContext2D;
    this.frames.forEach(frame => context.drawImage(frame.getBuffer(), 0, 0, this.canvas.width, this.canvas.height));
  }
}
