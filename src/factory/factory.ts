import Vector from "../math/vector";
import IDGenerator from "./idGenerator";
import MathHelper from "../math/math";
import Config from "../config/config";

(window as any).IDGen = IDGenerator;

export default class EntityFactory {
  static createBasicEntity() {
    return {
      ID: IDGenerator.getId(),
      hasChanged: false
    }
  }
  static createRect() {
    return {
      ...this.createBasicEntity(),
      position: Vector.create(2),
      velocity: Vector.create(2),
      acceleration: Vector.create(2),
      moves: true,
      rectModel: {
        size: Vector.create([10, 10]),
        centerShift: Vector.create([5, 5]),
        color: MathHelper.getRandomColor(),
        cachedDimensions: [0, 0, 0, 0]
      }
    }
  }

  static createSideScroller() {
    return {
      ...this.createRect(),
      position: MathHelper.getRandomVector(Config.WORLD.SIZE),
      velocity: Vector.create([.2, 0]),
      wrapAroundWorld: true,
      maxAcceleration: 1,
      maxVelocity: Infinity,
      rectModel: {
        size: Vector.create([10, 10]),
        centerShift: Vector.create([5, 5]),
        color: "#ffffff40",
        cachedDimensions: [0, 0, 0, 0]
      }
    }
  }

  static createMouseFollower() {
    return {
      ...this.createRect(),
      wrapAroundWorld: true,
      mouseFollower: true,
      explodes: true,
      position: MathHelper.getRandomVector(Config.WORLD.SIZE),
      //FIXME: batched systems
      maxAcceleration: Config.ENTITIES.MOUSE_FOLLOWER.MAX_ACCELERATION,
      maxVelocity: Config.ENTITIES.MOUSE_FOLLOWER.MAX_VELOCITY
    }
  }

  static createExplosion() {
    return {
      ...this.createBasicEntity(),
      position: Vector.create(2),
      explosion: true,
      explosionVelocity: Config.ENTITIES.EXPLOSION.VELOCITY,
      maxExplosionDistance: Config.ENTITIES.EXPLOSION.DISTANCE,
      explosionModel: {
        color: MathHelper.getRandomColor(),
        radius: 500,
        lifeTime: 2200,
        progress: 0
      }
    }
  }
}
