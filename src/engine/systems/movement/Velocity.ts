import { VelocityEntity } from "../../ecs/Entity";
import System from "../../ecs/system/System";


export default class Velocity extends System {
  constructor() {
    super("Velocity", ["velocity", "position"], ["isFrozen"]);
  }

  updateEntity(entity: VelocityEntity, dt: number) {
    entity.position.x += entity.velocity.x * dt;
    entity.position.y += entity.velocity.y * dt;
  }
}
