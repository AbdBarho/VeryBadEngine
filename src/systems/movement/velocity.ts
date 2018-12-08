import System from "../../ecs/system/system";
import Vector from "../../math/vector";
import Entity from "../../ecs/entity";

interface VelocityEntity extends Entity {
  position: Vector;
  velocity: Vector;
}

export default class VelocitySystem extends System {
  constructor() {
    super(["velocity", "position"]);
  }

  updateEntity(entity: VelocityEntity, dt: number) {
    let velCopy = entity.velocity.copy();
    entity.position.addVec(velCopy.mulNum(dt));
    entity.hasChanged = true;
    Vector.store(velCopy);
  }
}
