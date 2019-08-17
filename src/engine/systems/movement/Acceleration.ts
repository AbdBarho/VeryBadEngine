import { AccelerationEntity } from "../../ecs/Entity";
import System from "../../ecs/system/System";


export default class Acceleration extends System {
  constructor() {
    super("Acceleration", ["velocity", "acceleration"], ["isFrozen"]);
  }

  updateEntity(e: AccelerationEntity, dt: number) {
    e.velocity.x += e.acceleration.x * dt;
    e.velocity.y += e.acceleration.y * dt;
  }
}
