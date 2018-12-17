import Config from "../../config/config";
import IDGenerator from "../../factory/idGenerator";
import MathHelper from "../../math/math";
import Vector from "../../math/vector";

(window as any).IDGen = IDGenerator;

export default class EntityFactory {
  static createBasicEntity() {
    return {
      ID: IDGenerator.getId(),
      hasChanged: false
    }
  }
  static createRect() {
    let size = MathHelper.getRandomInt(12, 6);
    size += size % 2;
    let center = size / 2;
    return {
      ...this.createBasicEntity(),
      position: Vector.create(2),
      velocity: Vector.create(2),
      acceleration: Vector.create(2),
      rectModel: {
        size: Vector.create([size, size]),
        centerShift: Vector.create([center, center]),
        color: MathHelper.getRandomColor(),
        cachedDimensions: [0, 0, 0, 0]
      }
    }
  }

  static createSideScroller() {
    let size = MathHelper.getRandomInt(16, 6);
    size += size % 2;
    let center = size / 2;
    return {
      ...this.createBasicEntity(),
      position: MathHelper.getRandomVector(Config.WORLD.SIZE),
      velocity: Vector.create([Math.random() / 5, 0]),
      wrapAroundWorld: true,
      rectModel: {
        size: Vector.create([size, size]),
        centerShift: Vector.create([center, center]),
        color: "#ffffff20",
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

  static createAnimatedStar() {
    let numSpikes = MathHelper.getRandomInt(10, 4);
    let lifeTimeInSeconds = MathHelper.getRandomInt(15, 5);
    let rotationDirection = MathHelper.getRandomBool() ? 1 : -1;
    let rotationAngle = 360 / numSpikes / lifeTimeInSeconds;
    let rotationSpeed = rotationDirection * MathHelper.degreesPerSec(rotationAngle);
    return {
      ...this.createBasicEntity(),
      wrapAroundWorld: true,
      position: MathHelper.getRandomVector(Config.WORLD.SIZE),
      velocity: Vector.create([MathHelper.speedPerSecond(MathHelper.getRandomInt(50, 1)), 0]),
      starAnimation: {
        progress: MathHelper.getRandomInt(1000),
        lifeTime: lifeTimeInSeconds * 1000,
        minRadius: MathHelper.getRandomInt(20, 10),
        maxRadius: MathHelper.getRandomInt(100, 50),
        numSpikes,
        rotationSpeed,
        color: "#fff"
      }
    }
  }
}
