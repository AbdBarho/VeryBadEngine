import Entity from "../../ecs/Entity";
import System from "../../ecs/system/System";
import Vector from "../../math/Vector";
import Vec2 from "../../math/vector/Vec2";

interface MovementSystemObject extends Entity {
  moves: boolean;
  acceleration: Vec2;
  velocity: Vec2;
  position: Vec2;
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
    //limit acceleration
    scaleIfNeeded(acc, entity.maxAcceleration);

    //update speed
    let accCopy = Vector.copy(acc);
    vel.addVec(accCopy.mulNum(dt));

    //limit speed
    scaleIfNeeded(vel, entity.maxVelocity);

    //update position
    let velCopy = Vector.copy(vel);
    entity.position.addVec(velCopy.mulNum(dt));

    entity.hasChanged = true;

    //save memory
    Vector.store(accCopy, velCopy);
  }
}

function scaleIfNeeded(vec: Vec2, scale: number) {

  // smart way
  let magSq = vec.magnitudeSquared();
  if (magSq > scale * scale) {
    let mag = Math.sqrt(magSq);
    vec.x = scale * vec.x / mag;
    vec.y = scale * vec.y / mag;
  }

  //fast way
  // vec.x = vec.x > scale ? scale : vec.x < -scale ? -scale : vec.x;
  // vec.y = vec.y > scale ? scale : vec.y < -scale ? -scale : vec.y;

}
