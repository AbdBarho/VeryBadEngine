import Layer from "../../core/canvas/layers/Layer";
import IGradient from "../../ecs/components/gradient/IGradient";
import Entity from "../../ecs/Entity";
import System from "../../ecs/system/System";
import Update from "../../ecs/system/Update";

interface GradientEntity extends Entity {
  gradient: IGradient;
}

export default class GradientRenderer extends System {
  layer: Layer;
  constructor(layer: Layer) {
    super("GradientRender", Update.every, ["gradient"]);
    this.layer = layer;
  }

  updateEntity(entity: GradientEntity, dt: number) {
    entity.gradient.update(dt);
    this.layer.fillStyle(entity.gradient.getFillStyle(this.layer));
    this.layer.fillFrame();
  }
}
