import Entity from "../ecs/entity";
import Vector from "../math/vector";
import IDGenerator from "./idgenerator";
import MathHelper from "../math/math";
import Initconfig from "../config/initconfig";

export default class EntityFactory {
  static createRect(): Entity {
    return {
      ID: IDGenerator.getId(),
      hasChanged: false,
      isFrozen: false,
      position: new Vector(2),
      velocity: new Vector(2),
      acceleration: new Vector(2),
      rectModel: {
        size: new Vector([20, 20]),
        centerShift: new Vector([10, 10]),
        color: MathHelper.getRandomColor(),
        cachedDimensions: [0, 0, 0, 0]
      }
    }
  }

  static createMouseFollower(): Entity {
    return {
      ...this.createRect(),
      mouseFollower: true,
      position: MathHelper.getRandomVector(Initconfig.WORLD.SIZE),
      maxAcceleration: Initconfig.ENTITIES.MOUSE_FOLLOWER.MAX_ACCELERATION,
      maxVelocity: Initconfig.ENTITIES.MOUSE_FOLLOWER.MAX_VELOCITY
    }
  }
}