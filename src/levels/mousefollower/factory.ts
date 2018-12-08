import Config from "../../config/config";
import MathHelper from "../../math/math";
import Vector from "../../math/vector";
import IDGenerator from "../../factory/idGenerator";

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
      ...this.createBasicEntity(),
      position: MathHelper.getRandomVector(Config.WORLD.SIZE),
      velocity: Vector.create([.2, 0]),
      acceleration: Vector.create(2),
      moves: true,
      wrapAroundWorld: true,
      maxAcceleration: 0,
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
      maxAcceleration: MathHelper.accelerationPerSecond(1000),
      maxVelocity: MathHelper.speedPerSecond(500)
    }
  }

  static createExplosion() {
    return {
      ...this.createBasicEntity(),
      position: Vector.create(2),
      explosion: true,
      explosionVelocity: MathHelper.speedPerSecond(500) * 2, // * 2 to counter v0
      maxExplosionDistance: 1000,
      explosionModel: {
        color: MathHelper.getRandomColor(),
        radius: 500,
        lifeTime: 1000,
        progress: 0
      }
    }
  }
}
