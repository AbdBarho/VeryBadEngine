import Entity from "../../ecs/Entity";
import System from "../../ecs/system/System";
import Update from "../../ecs/system/Update";
import Vector from "../../math/Vector";
import Vec2 from "../../math/vector/Vec2";

interface VelocityEntity extends Entity {
  position: Vec2;
  velocity: Vec2;
}

export default class VelocitySystem extends System {
  constructor() {
    super("Velocity", Update.every, ["velocity", "position"]);
  }

  updateEntity(entity: VelocityEntity, dt: number) {
    let velCopy = Vector.copy(entity.velocity)
    entity.position.addVec(velCopy.mulNum(dt));
    entity.hasChanged = true;
    Vector.store(velCopy);
  }
}
