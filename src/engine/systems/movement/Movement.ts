import Entity from "../../ecs/Entity";
import System from "../../ecs/system/System";
import { V2 } from "../../math/VectorTypes";

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
    super("Movement", ["position", "velocity", "acceleration", "maxAcceleration", "maxVelocity"]);
  }

  updateEntity(entity: MovementSystemObject, dt: number) {
    let acc = entity.acceleration;
    let vel = entity.velocity;
    let pos = entity.position;
    //limit acceleration
    scaleIfNeeded(acc, entity.maxAcceleration);

    //update speed
    vel.x += acc.x * dt;
    vel.y += acc.y * dt;

    //limit speed
    scaleIfNeeded(vel, entity.maxVelocity);

    //update position
    pos.x += vel.x * dt;
    pos.y += vel.y * dt;

    entity.hasChanged = true;
  }
}

function scaleIfNeeded(v: V2, scale: number) {

  // smart way
  let magSq = v.x * v.x + v.y * v.y;
  if (magSq > scale * scale) {
    let mag = Math.sqrt(magSq);
    v.x = scale * v.x / mag;
    v.y = scale * v.y / mag;
  }

  //fast way
  // vec.x = vec.x > scale ? scale : vec.x < -scale ? -scale : vec.x;
  // vec.y = vec.y > scale ? scale : vec.y < -scale ? -scale : vec.y;

}
