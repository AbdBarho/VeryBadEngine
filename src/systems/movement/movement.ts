import System from "../../ecs/system/system";
import Entity from "../../ecs/entity";
import Vector from "../../math/vector";
import Logger from "../../services/logger";


interface MovementSystemObject extends Entity {
  moves: boolean;
  acceleration: Vector;
  velocity: Vector;
  position: Vector;
  maxVelocity: number;
  maxAcceleration: number;
}

export default class MovementSystem extends System {
  constructor() {
    super(["moves", "position", "velocity", "acceleration", "maxAcceleration", "maxVelocity"]);
  }

  updateEntity(entity: MovementSystemObject, dt: number) {
    if (entity.isFrozen)
      return

    let acc = entity.acceleration;
    let vel = entity.velocity;
    //limit acceleration
    acc.limitByMaxNumber(entity.maxAcceleration);

    //update speed
    let accCopy = acc.copy();
    vel.addVec(accCopy.mulNum(dt));

    //limit speed
    vel.limitByMaxNumber(entity.maxVelocity);

    //update position
    let velCopy = vel.copy();
    entity.position.addVec(velCopy.mulNum(dt));

    entity.hasChanged = true;

    //save memory
    Vector.store(accCopy, velCopy);
  }
}
