import Frame from "../../../engine/Frame";
import { OpacityAnimation } from "../../../engine/ecs/components/Component";
import ECS from "../../../engine/ecs/ECS";
import System from "../../../engine/ecs/system/System";
import { interpolate } from "../../../engine/math/Math";

export default class OpacityBuffer extends System {
  output: Frame;
  frames: Frame[];
  ecs: ECS;
  constructor(output: Frame, frames: Frame[], ecs: ECS) {
    super('OpacityBuffer', ['opacityAnimation']);
    this.output = output;
    this.frames = frames;
    this.ecs = ecs;
  }

  update(dt: number) {
    //clear at first, so the transparency shows
    this.output.clear()

    const alpha = this.getAlpha(dt);
    this.output.alpha(alpha);
    this.frames.forEach(f => this.output.fillWithImage(f.getBuffer()));
    this.output.alpha(1);
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
