import Frame from '../../engine/core/canvas/layers/Frame';
import ECS from "../../engine/ecs/ECS";
import { getRandomInt } from '../../engine/math/Math';
import LoadingWorker from './LevelWorker';
import GradientRenderer from '../mousefollower/systems/GradientRender';
import Config from '../mousefollower/Config';
import Factory from '../mousefollower/services/Factory';
import OpacityBuffer from './systems/OpacityBuffer';

export default class LoadingLevel extends ECS {
  canvas: OffscreenCanvas;
  worker: LoadingWorker;

  constructor(worker: LoadingWorker) {
    super();
    this.worker = worker;
    this.canvas = worker.canvas!;

    //create systems
    const frame = new Frame();
    this.systems = [
      new GradientRenderer(frame),
      new OpacityBuffer(this.canvas, [frame], this, this.worker)
    ];

    //background
    this.queueEntity(Factory.createRotatingGradient(
      Config.WORLD.SIZE, getRandomInt(360), 0.05, "min", "center", "center", {
        0: "#a00",
        100: "#00a"
      }
    ));

    // this.queueEntity(Factory.createRotatingGradient(
    //   Config.WORLD.SIZE, -90, -0.012, "min", "right", "top", {
    //     50: "#0000",
    //     100: "#0006"
    //   }
    // ));
  }

  drawLastFrame() {
    this.systems[this.systems.length - 1].update(0);
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
