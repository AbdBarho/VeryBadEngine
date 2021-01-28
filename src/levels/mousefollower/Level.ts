import ECS from "../../engine/ecs/ECS";
import Frame from '../../engine/Frame';
import Acceleration from '../../engine/systems/movement/Acceleration';
import AccelerationLimiter from '../../engine/systems/movement/AccelerationLimiter';
import Velocity from "../../engine/systems/movement/Velocity";
import VelocityLimiter from '../../engine/systems/movement/VelocityLimiter';
import FlushBuffer from "../../engine/systems/render/FlushBuffer";
import RectangleRenderer from "../../engine/systems/render/RectangleRender";
import World from '../WorldManager';
import Config from './Config';
import Factory from "./services/Factory";
import ExplosionDetection from "./systems/ExplosionDetection";
import ExplosionRender from "./systems/ExplosionRender";
import GradientRenderer from "./systems/GradientRender";
import InputSystem from "./systems/InputSystem";
import MouseFollowerSystem from "./systems/MouseFollowerSystem";
import Navigator from './systems/Navigator';
import StarAnimationRenderer from "./systems/StarAnimationRender";
import WrapAroundWorld from "./systems/WrapAroundWorld";

export default class MouseFollowerLevel extends ECS {
  world: World;

  constructor(world: World) {
    super();
    this.world = world;
    const canvas = world.canvas;
    const outputFrame = canvas.frame;
    //create systems
    const InputManager = this.world.input;
    const tempFrame = new Frame(canvas);

    const mouseFollowerSystem = new MouseFollowerSystem(InputManager, this);
    const navigator = new Navigator(mouseFollowerSystem, tempFrame);
    const bufferSystem = new FlushBuffer(outputFrame, [tempFrame]);
    this.systems = [
      new GradientRenderer(tempFrame),
      new InputSystem(InputManager, this, mouseFollowerSystem, world, navigator, bufferSystem),

      navigator,
      mouseFollowerSystem,
      new ExplosionDetection(),


      //movement
      new AccelerationLimiter(),
      new Acceleration(),
      new VelocityLimiter(),
      new Velocity(),
      new WrapAroundWorld(),

      //render
      new StarAnimationRenderer(tempFrame),
      new RectangleRenderer(tempFrame),
      new ExplosionRender(tempFrame, this),

      //flush
      bufferSystem
    ];

    //background
    this.queueEntity(Factory.createRotatingGradient(
      Config.WORLD.SIZE, 0, 0.05, "min", "center", "center", {
      0: "#400a",
      100: "#004a"
    }
    ));


    for (let i = 0; i < 100; i++)
      this.queueEntity(Factory.createSideScroller());

    for (let i = 0; i < 100; i++)
      this.queueEntity(Factory.createAnimatedStar());

    for (let i = 0; i < 500; i++)
      this.queueEntity(Factory.createMouseFollower());


    this.init();

  }
}
