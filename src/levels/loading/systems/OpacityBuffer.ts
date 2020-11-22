import Frame from "../../../engine/core/canvas/layers/Frame";
import { OpacityAnimation } from "../../../engine/ecs/components/Component";
import ECS from "../../../engine/ecs/ECS";
import System from "../../../engine/ecs/system/System";
import { interpolate } from "../../../engine/math/Math";

export default class OpacityBuffer extends System {
  output: HTMLCanvasElement;
  frames: Frame[];
  ctx: CanvasRenderingContext2D;
  ecs: ECS;
  constructor(output: HTMLCanvasElement, frames: Frame[], ecs: ECS) {
    super('OpacityBuffer', ['opacityAnimation']);
    this.output = output;
    this.frames = frames;
    this.ctx = output.getContext("2d") as CanvasRenderingContext2D;
    this.ecs = ecs;
  }

  update(dt: number) {
    //clear at first, so the transparency shows
    this.ctx.clearRect(0, 0, this.output.width, this.output.height);

    const alpha = this.getAlpha(dt);
    this.ctx.globalAlpha = alpha;
    for (const frame of this.frames)
      this.ctx.drawImage(frame.getBuffer(), 0, 0, this.output.width, this.output.height);
    this.ctx.globalAlpha = 1;
  }

  getAlpha(dt: number): number {
    // return 0.1;
    const entities = Object.values(this.entities);
    if (entities.length == 0)
      return 1;
    console.assert(entities.length === 1);
    const o = entities[0].opacityAnimation as OpacityAnimation;

    o.progress = o.progress + dt;
    const percent = o.progress / o.lifeTime;

    if (percent > 1) {
      // @ts-ignore
      this.ecs.world.setIdle(this);
      return o.end;
    }
    return interpolate(o.start, o.end, percent);
  }
}
