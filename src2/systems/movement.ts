import System from "../ecs/system";
import Entity from "../ecs/entity";
import Vector from "../math/vector";


interface MovementSystemObject extends Entity {
  acceleration: Vector;
  velocity: Vector;
  position: Vector;
}

export default class MovementSystem extends System {
  constructor() {
    super(["position", "velocity", "acceleration"]);
  }

  updateEntity(entity: MovementSystemObject, dt: number) {
    if (entity.isFrozen)
      return
    
    entity.acceleration.cache();
    entity.velocity.addVec(entity.acceleration.mulNum(dt));
    entity.acceleration.uncache();

    entity.velocity.cache();
    entity.position.addVec(entity.velocity.mulNum(dt));
    entity.velocity.uncache();

    entity.hasChanged = true;
  }
}