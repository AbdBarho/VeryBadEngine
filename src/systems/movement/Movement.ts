import Entity from "../../ecs/Entity";
import System from "../../ecs/system/System";
import Update from "../../ecs/system/Update";
import Vector from "../../math/Vector";
import Vec2 from "../../math/vector/Vec2";
import Logger from "../../services/Logger";

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
    super("Movement", Update.every,
      ["position", "velocity", "acceleration", "maxAcceleration", "maxVelocity"]);
  }

  updateEntity(entity: MovementSystemObject, dt: number) {
    let acc = entity.acceleration;
    let vel = entity.velocity;
    //limit acceleration
    acc.limitByMaxNumber(entity.maxAcceleration);
    //update speed
    let accCopy = Vector.copy(acc);
    vel.addVec(accCopy.mulNum(dt));

    //limit speed
    vel.limitByMaxNumber(entity.maxVelocity);

    //update position
    let velCopy = Vector.copy(vel);
    entity.position.addVec(velCopy.mulNum(dt));

    entity.hasChanged = true;

    //save memory
    Vector.store(accCopy, velCopy);
  }
}
