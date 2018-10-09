import System from "../../ecs/system/system";
import IEntity from "../../ecs/entity";
import Vector from "../../math/vector";
import Logger from "../../services/logger";


interface MovementSystemObject extends IEntity {
  acceleration: Vector;
  velocity: Vector;
  position: Vector;
  maxVelocity: number;
  maxAcceleration: number;
}

export default class MovementSystem extends System {
  constructor() {
    super(["position", "velocity", "acceleration", "maxAcceleration", "maxVelocity"]);
  }

  updateEntity(entity: MovementSystemObject, dt: number) {
    if (entity.isFrozen)
      return

    //limit acceleration
    entity.acceleration.limitByMaxNumber(entity.maxAcceleration);

    //update speed
    entity.acceleration.cache();
    entity.velocity.addVec(entity.acceleration.mulNum(dt));
    entity.acceleration.uncache();

    //limit speed
    entity.velocity.limitByMaxNumber(entity.maxVelocity);

    //update position
    entity.velocity.cache();
    entity.position.addVec(entity.velocity.mulNum(dt));
    entity.velocity.uncache();

    entity.hasChanged = true;
  }
}