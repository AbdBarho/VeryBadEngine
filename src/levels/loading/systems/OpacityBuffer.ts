import Frame from "../../../engine/core/canvas/layers/Frame";
import System from "../../../engine/ecs/system/System";
import { OpacityAnimation } from "../../../engine/ecs/components/Component";
import ECS from "../../../engine/ecs/ECS";
import LevelWorker from "../../worker/LevelWorker";
import { interpolate } from "../../../engine/math/Math";

export default class OpacityBuffer extends System {
  output: OffscreenCanvas;
  frames: Frame[];
  ctx: OffscreenCanvasRenderingContext2D;
  worker: LevelWorker;
  ecs: ECS;
  constructor(output: OffscreenCanvas, frames: Frame[], ecs: ECS, worker: LevelWorker) {
    super('OpacityBuffer', ['opacityAnimation']);
    this.output = output;
    this.frames = frames;
    this.ctx = output.getContext("2d") as OffscreenCanvasRenderingContext2D;
    this.ecs = ecs;
    this.worker = worker;
  }

  update(dt: number) {
    //clear at first, so the transparency shows
    this.ctx.clearRect(0, 0, this.output.width, this.output.height);

    const alpha = this.getAlpha(dt);
    this.ctx.globalAlpha = alpha;1
    for (const frame of this.frames)
      this.ctx.drawImage(frame.getBuffer(), 0, 0, this.output.width, this.output.height);
    this.ctx.globalAlpha = 1;
  }

  getAlpha(dt: number): number {
    const entities = Object.values(this.entities);
    if (entities.length == 0)
      return 1;
    console.assert(entities.length === 1);
    const o = entities[0].opacityAnimation as OpacityAnimation;

    o.progress = o.progress + dt;
    const percent = o.progress / o.lifeTime;
    //FIXME: hack!!!
    if (percent > 1) {
      this.worker.send({ type: "set_self_to_idle" });
      return o.end;
    }
    return interpolate(o.start, o.end, percent);
  }
}
