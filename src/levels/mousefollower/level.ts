import Canvas from "../../core/Canvas";
import InputManager from "../../core/InputManager";
import ECS from "../../ecs/ECS";
import CascadingSystem from "../../ecs/system/CascadingSystem";
import InputSystem from "../../systems/input/InputSystem";
import SlowMotion from "../../systems/input/SlowMotion";
import ExplosionDetection from "../../systems/movement/ExplosionDetection";
import KeepInWorld from "../../systems/movement/KeepInWorld";
import VelocitySystem from "../../systems/movement/Velocity";
import WrapAroundWorld from "../../systems/movement/WrapAroundWorld";
import BackgroundColor from "../../systems/render/Background";
import ExplosionRender from "../../systems/render/ExplosionRender";
import LayerClearer from "../../systems/render/LayerClearer";
import RectangleRenderer from "../../systems/render/RectangleRender";
import MouseFollowerController from "./MouseFollowerController";
import ExplosionOnClick from "./ExplosionOnClick";
import EntityFactory from "./Factory";
import MouseFollowerMovementSystem from "./MovementSystem";
import StarAnimationRenderer from "./StarAnimationRender";
import MouseFollowerSystem from "./MouseFollowerSystem";
import Update from "../../ecs/system/Update";

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

      new CascadingSystem("CascadingMovement", Update.every, [MFMovement, new VelocitySystem()]),
      new CascadingSystem("CascadingBounding", Update.every, [new KeepInWorld(), new WrapAroundWorld()]),

      new BackgroundColor(0, "#002", this.canvas, false),
      new StarAnimationRenderer(0, this.canvas),
      new RectangleRenderer(0, this.canvas),
      new ExplosionRender(0, this.canvas, this),

    ];
    //background
    for (let i = 0; i < 100; i++)
      this.queueEntity(EntityFactory.createSideScroller());

    for (let i = 0; i < 100; i++)
      this.queueEntity(EntityFactory.createAnimatedStar());

    //in game followers
    for (let i = 0; i < 800; i++)
      this.queueEntity(EntityFactory.createMouseFollower());
  }
}
