import System from "../ecs/system";
import Entity from "../ecs/entity";
import Vector from "../math/vector";

interface AccelerationLimitedEntity extends Entity {
  acceleration: Vector;
  maxAcceleration: number;
}
export default class AccelerationLimiter extends System {
  constructor() {
    super(["acceleration", "maxAcceleration"])
  }

  updateEntity(entity: AccelerationLimitedEntity) {
    let max = entity.maxAcceleration;
    entity.acceleration.limitValues(-max, max);
  }
}