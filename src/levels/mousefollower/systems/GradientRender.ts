import Frame from "../../../engine/core/canvas/layers/Frame";
import IGradient from "../../../engine/ecs/components/gradient/IGradient";
import Entity from "../../../engine/ecs/Entity";
import System from "../../../engine/ecs/system/System";


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
    const data = entity.gradient.getFillStyle();
    this.frame.renderGradientData(data);
  }
}
