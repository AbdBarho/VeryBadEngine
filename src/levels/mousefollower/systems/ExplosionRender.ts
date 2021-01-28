import Frame from "../../../engine/Frame";
import ECS from "../../../engine/ecs/ECS";
import System from "../../../engine/ecs/system/System";
import { toHexColor } from "../../../engine/math/Math";
import StepFunctions from "../../../engine/math/Step";
import { Explosion } from "../types/Entities";


export default class ExplosionRender extends System {
  frame: Frame;
  ecs: ECS;
  constructor(frame: Frame, ecs: ECS) {
    super("ExplosionRender", ["explosion", "explosionModel", "position"]);
    this.frame = frame;
    this.ecs = ecs;
  }

  updateEntity(entity: Explosion, dt: number) {
    const { explosionModel, position } = entity;
    let { progress, lifeTime, color, radius } = explosionModel;

    //update animation progress
    entity.explosionModel.progress = progress = progress + dt;
    if (progress >= lifeTime)
      return this.ecs.removeEntity(entity.ID);

    const percent = progress / lifeTime;

    radius *= StepFunctions.smoothStop(percent, 5);
    const opacity = Math.trunc((1 - StepFunctions.smoothStop(percent, 10)) * 256);
    color = color + toHexColor(opacity);

    this.frame.fillCircle(position.x, position.y, radius, color);
  }

}
