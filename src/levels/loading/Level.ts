import Frame from '../../engine/core/canvas/layers/Frame';
import ECS from "../../engine/ecs/ECS";
import { getRandomInt } from '../../engine/math/Math';
import GradientRenderer from '../mousefollower/systems/GradientRender';
import Config from '../mousefollower/Config';
import Factory from '../mousefollower/services/Factory';
import OpacityBuffer from './systems/OpacityBuffer';
import WorldManager from '../WorldManager';
import Layer from '../../engine/core/canvas/layers/Layer';

export default class LoadingLevel extends ECS {
  world: WorldManager;
  outputLayer: Layer;

  constructor(world: WorldManager) {
    super();
    this.world = world;
    this.outputLayer = world.canvas.getLayer(1);

    //create systems
    const frame = new Frame();
    this.systems = [
      new GradientRenderer(frame),
      new OpacityBuffer(this.outputLayer.getFrame(), [frame], this)
    ];

    //background
    this.queueEntity(Factory.createRotatingGradient(
      Config.WORLD.SIZE, 0, 0.05, "min", "center", "center", {
        0: "#a00",
        100: "#00a"
      }
    ));
  }

  drawLastFrame() {
    // no need to, it is just a loading screen
    // this.systems[this.systems.length - 1].update(0);
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
