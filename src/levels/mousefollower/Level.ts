import Frame from '../../engine/core/canvas/layers/Frame';
import { InputProvider } from "../../engine/core/Inputmanager";
import ECS from "../../engine/ecs/ECS";
import { getRandomInt } from '../../engine/math/Math';
import Acceleration from '../../engine/systems/movement/Acceleration';
import AccelerationLimiter from '../../engine/systems/movement/AccelerationLimiter';
import Velocity from "../../engine/systems/movement/Velocity";
import VelocityLimiter from '../../engine/systems/movement/VelocityLimiter';
import FlushBuffer from "../../engine/systems/render/FlushBuffer";
import RectangleRenderer from "../../engine/systems/render/RectangleRender";
import Config from './Config';
import MouseFollowerWorker from "./LevelWorker";
import Factory from "./services/Factory";
import ExplosionDetection from "./systems/ExplosionDetection";
import ExplosionRender from "./systems/ExplosionRender";
import GradientRenderer from "./systems/GradientRender";
import InputSystem from "./systems/InputSystem";
import MouseFollowerSystem from "./systems/MouseFollowerSystem";
import StarAnimationRenderer from "./systems/StarAnimationRender";
import WrapAroundWorld from "./systems/WrapAroundWorld";

export default class MouseFollowerLevel extends ECS {
  input: InputProvider;
  canvas: OffscreenCanvas;
  worker: MouseFollowerWorker;

  constructor(worker: MouseFollowerWorker) {
    super();
    this.worker = worker;
    this.input = worker.input;
    this.canvas = worker.canvas!;

    //create systems
    const mouseFollowerSystem = new MouseFollowerSystem(this.input, this);
    const frame = new Frame();
    this.systems = [
      new GradientRenderer(frame),
      new InputSystem(this.input, this, mouseFollowerSystem),


      mouseFollowerSystem,
      new ExplosionDetection(),


      //movement
      new AccelerationLimiter(),
      new Acceleration(),
      new VelocityLimiter(),
      new Velocity(),
      new WrapAroundWorld(),

      //render
      new StarAnimationRenderer(frame),
      new RectangleRenderer(frame),
      new ExplosionRender(frame, this),

      //flush
      new FlushBuffer(this.canvas, [frame])

    ];

    //background
    this.queueEntity(Factory.createRotatingGradient(
      Config.WORLD.SIZE, getRandomInt(360), 0.05, "min", "center", "center",  {
        0: "#400a",
        100: "#004a"
      }
    ));

    this.queueEntity(Factory.createRotatingGradient(
      Config.WORLD.SIZE, -90, -0.012, "min", "right", "top", {
        50: "#0000",
        100: "#0006"
      }
    ));

    for (let i = 0; i < 100; i++)
      this.queueEntity(Factory.createSideScroller());

    for (let i = 0; i < 100; i++)
      this.queueEntity(Factory.createAnimatedStar());

    for (let i = 0; i < 1000; i++)
      this.queueEntity(Factory.createMouseFollower());


    this.init();

  }

  drawLastFrame() {
    this.systems[this.systems.length - 1].update(0);
  }
}
