import EntityFactory from "../../ecs/Factory";
import MathHelper from "../../math/Math";
import Vector from "../../math/Vector";

export default class MouseFollowerFactory {
  static createRectModel(sideLength: number, color: string) {
    let half = sideLength / 2;
    return {
      rectModel: {
        color,
        size: Vector.create([sideLength, sideLength]),
        centerShift: Vector.create([half, half]),
        cachedDimensions: [0, 0, 0, 0]
      }
    }
  }

  static createSideScroller() {
    let size = MathHelper.getRandomInt(20, 6);
    size += size % 2;
    return {
      ...EntityFactory.createMovingEntity(2, [Math.random() / 5, 0]),
      ...this.createRectModel(size, "#ffffff20"),
      position: EntityFactory.getVectorInWorld(),
      wrapAroundWorld: true
    }
  }

  static createMouseFollower() {
    let size = MathHelper.getRandomInt(12, 6);
    return {
      ...EntityFactory.createAcceleratingEntity(2, 2, 2),
      position: EntityFactory.getVectorInWorld(),
      ...this.createRectModel(size, MathHelper.getRandomColor()),
      wrapAroundWorld: true,
      mouseFollower: true,
      explodes: true,
      //FIXME: better physics
      maxAcceleration: MathHelper.accelerationPerSecond(1000),
      maxVelocity: MathHelper.speedPerSecond(500)
    }
  }

  static createExplosion() {
    return {
      ...EntityFactory.createBasicEntity(),
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
    let numSpikes = MathHelper.getRandomInt(8, 4);
    let lifeTimeInSeconds = MathHelper.getRandomInt(15, 5);
    let rotationDirection = MathHelper.getRandomBool() ? 1 : -1;
    let rotationAngle = 360 / numSpikes / lifeTimeInSeconds;
    let rotationSpeed = rotationDirection * MathHelper.degreesPerSec(rotationAngle);
    return {
      ...EntityFactory.createMovingEntity(2,[MathHelper.speedPerSecond(MathHelper.getRandomInt(50, 1)), 0]),
      position: EntityFactory.getVectorInWorld(),
      wrapAroundWorld: true,
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
