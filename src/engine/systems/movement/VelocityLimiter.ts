import System from "../../ecs/system/System";
import { LimitedVel } from "../../ecs/Entity";
import { limitMag } from "../../math/Math";

export default class VelocityLimiter extends System {
  constructor() {
    super("VelocityLimiter", ["velocity", "maxVelocity"], ["isFrozen"]);
  }

  updateEntity(entity: LimitedVel, dt: number) {
    limitMag(entity.velocity, entity.maxVelocity);
  }
}
