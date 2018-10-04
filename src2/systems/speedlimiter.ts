import System from "../ecs/system";
import Entity from "../ecs/entity";
import Vector from "../math/vector";

interface SpeedLimitedEntity extends Entity {
  velocity: Vector;
  maxVelocity: number;
}
export default class SpeedLimiter extends System {
  constructor() {
    super(["velocity", "maxVelocity"])
  }

  updateEntity(entity: SpeedLimitedEntity) {
    let max = entity.maxVelocity;
    entity.velocity.limitValues(-max, max);
  }
}