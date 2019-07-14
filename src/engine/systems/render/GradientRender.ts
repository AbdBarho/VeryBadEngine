import IGradient from "../../ecs/components/gradient/IGradient";
import Entity from "../../ecs/Entity";
import System from "../../ecs/system/System";
import Frame from "../../core/canvas/layers/Frame";

interface GradientEntity extends Entity {
  gradient: IGradient;
}

export default class GradientRenderer extends System {
  frame: Frame;
  constructor(frame: Frame) {
    super("GradientRender", ["gradient"]);
    this.frame = frame;
  }

  updateEntity(entity: GradientEntity, dt: number) {
    entity.gradient.update(dt);
    this.frame.fillStyle(entity.gradient.getFillStyle(this.frame));
    this.frame.fillFrame();
  }
}
