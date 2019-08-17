import System from "../../ecs/system/System";
import { LimitedVel } from "../../ecs/Entity";
import { scaleIfNeeded } from "../../math/Math";

export default class VelocityLimiter extends System {
  constructor() {
    super("VelocityLimiter", ["velocity", "maxVelocity"], ["isFrozen"]);
  }

  updateEntity(entity: LimitedVel, dt: number) {
    scaleIfNeeded(entity.velocity, entity.maxVelocity);
  }
}
