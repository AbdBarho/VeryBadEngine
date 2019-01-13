import Entity from "../../ecs/Entity";
import System from "../../ecs/system/System";
import Update from "../../ecs/system/Update";
import Vector from "../../math/Vector";

interface VelocityEntity extends Entity {
  position: Vector;
  velocity: Vector;
}

export default class VelocitySystem extends System {
  constructor() {
    super("Velocity", Update.every, ["velocity", "position"]);
  }

  updateEntity(entity: VelocityEntity, dt: number) {
    let velCopy = entity.velocity.copy();
    entity.position.addVec(velCopy.mulNum(dt));
    entity.hasChanged = true;
    Vector.store(velCopy);
  }
}
