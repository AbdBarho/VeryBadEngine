import Frame from '../../engine/Frame';
import ECS from "../../engine/ecs/ECS";
import Config from '../mousefollower/Config';
import Factory from '../mousefollower/services/Factory';
import GradientRenderer from '../mousefollower/systems/GradientRender';
import World from '../WorldManager';
import OpacityBuffer from './systems/OpacityBuffer';

export default class LoadingLevel extends ECS {
  world: World;

  constructor(world: World) {
    super();
    this.world = world;
    const canvas = world.canvas;
    const outputFrame = canvas.frame;

    //create systems
    const frame = new Frame(canvas);
    this.systems = [
      new GradientRenderer(frame),
      new OpacityBuffer(outputFrame, [frame], this)
    ];

    //background
    this.queueEntity(Factory.createRotatingGradient(
      Config.WORLD.SIZE, 0, 0.05, "min", "center", "center", {
      0: "#a00",
      100: "#00a"
    }
    ));
  }

  fade() {
    this.queueEntity({
      ID: "fade", opacityAnimation: {
        start: 1,
        end: 0,
        progress: 0,
        lifeTime: 5000
      }
    });
  }
}
