import Entity from "../../ecs/Entity";
import System from "../../ecs/system/System";
import { V2 } from "../../math/VectorTypes";

interface VelocityEntity extends Entity {
  position: V2;
  velocity: V2;
}

export default class VelocitySystem extends System {
  constructor() {
    super("Velocity", ["velocity", "position"], ["mouseFollower"]);
  }

  updateEntity(entity: VelocityEntity, dt: number) {
    entity.position.x += entity.velocity.x * dt;
    entity.position.y += entity.velocity.y * dt;

    entity.hasChanged = true;

  }
}
