import Canvas from "../../core/canvas";
import { ExplosionModel } from "../../ecs/component";
import ECS from "../../ecs/ecs";
import Entity from "../../ecs/entity";
import System from "../../ecs/system/system";
import StepFunctions from "../../math/step";
import Vector from "../../math/vector";
import Layer from "../../core/layer";

interface Explosion extends Entity {
  position: Vector;
  explosion: boolean;
  explosionModel: ExplosionModel;
}

export default class ExplosionRender extends System {
  layer: Layer;
  ecs: ECS;
  constructor(layerNumber: number, canvas: Canvas, ecs: ECS) {
    super(["explosion", "explosionModel", "position"]);
    this.layer = canvas.getLayer(layerNumber);
    this.ecs = ecs;
  }

  updateEntity(entity: Explosion, dt: number) {
    let { explosionModel, position } = entity;
    let { progress, lifeTime, color, radius } = explosionModel;
    //update animation progress
    progress = progress + dt;
    if (progress >= lifeTime)
      return this.ecs.removeEntity(entity.ID);

    let percent = progress / lifeTime;

    radius *= StepFunctions.smoothStop(percent, 2);
    color = color.slice(0, -1) + "," + (1 - StepFunctions.smoothStop(percent, 5)) + ")";
    this.layer.fillCircle(position.values[0], position.values[1], radius, color);

    //save updated progress
    entity.explosionModel.progress = progress;
  }

}
