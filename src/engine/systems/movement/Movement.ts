import Entity from "../../ecs/Entity";
import System from "../../ecs/system/System";
import { V2 } from "../../math/VectorTypes";
import { limitMag } from "../../math/Math";

interface MovementSystemObject extends Entity {
  moves: boolean;
  acceleration: V2;
  velocity: V2;
  position: V2;
  maxVelocity: number;
  maxAcceleration: number;
}

export default class MovementSystem extends System {
  constructor() {
    super("Movement",
      ["position", "velocity", "acceleration", "maxAcceleration", "maxVelocity"],
      ["isFrozen"]
    );
  }

  updateEntity(entity: MovementSystemObject, dt: number) {
    let acc = entity.acceleration;
    let vel = entity.velocity;
    let pos = entity.position;
    //limit acceleration
    limitMag(acc, entity.maxAcceleration);

    //update speed
    vel.x += acc.x * dt;
    vel.y += acc.y * dt;

    //limit speed
    limitMag(vel, entity.maxVelocity);

    //update position
    pos.x += vel.x * dt;
    pos.y += vel.y * dt;
  }
}
