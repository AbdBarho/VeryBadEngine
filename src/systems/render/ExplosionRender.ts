import Canvas from "../../core/Canvas";
import Layer from "../../core/Layer";
import { ExplosionModel } from "../../ecs/Component";
import ECS from "../../ecs/ECS";
import Entity from "../../ecs/Entity";
import System from "../../ecs/system/System";
import Update from "../../ecs/system/Update";
import StepFunctions from "../../math/Step";
import Vec2 from "../../math/vector/Vec2";

interface Explosion extends Entity {
  position: Vec2;
  explosion: boolean;
  explosionModel: ExplosionModel;
}

export default class ExplosionRender extends System {
  layer: Layer;
  ecs: ECS;
  constructor(layerNumber: number, canvas: Canvas, ecs: ECS) {
    super("ExplosionRender", Update.every, ["explosion", "explosionModel", "position"]);
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
    this.layer.fillCircle(position.x, position.y, radius, color);

    //save updated progress
    entity.explosionModel.progress = progress;
  }

}
