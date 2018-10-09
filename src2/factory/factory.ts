import Vector from "../math/vector";
import IDGenerator from "./idgenerator";
import MathHelper from "../math/math";
import Initconfig from "../config/initconfig";
import IEntity from "../ecs/entity";

(window as any).IDGen = IDGenerator;

export default class EntityFactory {
  static createBasicEntity() {
    return {
      ID: IDGenerator.getId(),
      hasChanged: false,
      isFrozen: false,
    }
  }
  static createRect() {
    return {
      ...this.createBasicEntity(),
      position: new Vector(2),
      velocity: new Vector(2),
      acceleration: new Vector(2),
      rectModel: {
        size: new Vector([10, 10]),
        centerShift: new Vector([5, 5]),
        color: MathHelper.getRandomColor(),
        cachedDimensions: [0, 0, 0, 0]
      }
    }
  }

  static createSideScroller() {
    return {
      ...this.createRect(),
      position: MathHelper.getRandomVector(Initconfig.WORLD.SIZE),
      velocity: new Vector([10, 0]),
      wrapAroundWorld: true,
      explodes: true,
      maxAcceleration: Initconfig.ENTITIES.MOUSE_FOLLOWER.MAX_ACCELERATION,
      maxVelocity: Initconfig.ENTITIES.MOUSE_FOLLOWER.MAX_VELOCITY
    }
  }

  static createMouseFollower() {
    return {
      ...this.createRect(),
      wrapAroundWorld: true,
      mouseFollower: true,
      explodes: true,
      position: MathHelper.getRandomVector(Initconfig.WORLD.SIZE),
      //FIXME: batched systems
      maxAcceleration: Initconfig.ENTITIES.MOUSE_FOLLOWER.MAX_ACCELERATION,
      maxVelocity: Initconfig.ENTITIES.MOUSE_FOLLOWER.MAX_VELOCITY
    }
  }

  static createExplosion() {
    return {
      ...this.createBasicEntity(),
      position: new Vector(2),
      explosion: true,
      explosionVelocity: 500,
      maxExplosionDistance: 500
    }
  }
}