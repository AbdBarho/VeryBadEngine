import Canvas from "../../core/canvas";
import InputManager from "../../core/inputManager";
import ECS from "../../ecs/ecs";
import InputSystem from "../../systems/input/input";
import VelocitySystem from "../../systems/movement/velocity";
import WrapAroundWorld from "../../systems/movement/wrapAroundWorld";
import BackgroundColor from "../../systems/render/background";
import EntityFactory from "./factory";
import StarAnimationRenderer from "./starAnimation";

export default class Portfolio extends ECS {
  input: InputManager;
  canvas: Canvas;
  constructor(input: InputManager, canvas: Canvas) {
    super();
    this.input = input;
    this.canvas = canvas;
    this.systems = [
      new InputSystem(this.input),

      new VelocitySystem(),
      new WrapAroundWorld(),

      new BackgroundColor("#000", this.canvas),
      new StarAnimationRenderer(this.canvas)
    ];
    //background
    for (let i = 0; i < 100; i++)
      this.queueEntity(EntityFactory.createAnimatedStar());

    //useful for caching some renders
    this.executeQueue();
  }
}
