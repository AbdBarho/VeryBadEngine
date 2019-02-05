import config from "../../config/Config";
import RotatingGradient, { GradientRadius, GradientShiftX, GradientShiftY, GradientStops, RotatingGradientConfig } from "../../ecs/components/gradient/RotatingGradient";
import EntityFactory from "../../ecs/Factory";
import MathHelper from "../../math/Math";
import Vector from "../../math/Vector";

export default class MouseFollowerFactory {
  static createRectModel(sideLength: number, color: string) {
    let half = sideLength / 2;
    return {
      rectModel: {
        color,
        size: Vector.create(sideLength, sideLength),
        centerShift: Vector.create(half, half),
        cachedDimensions: [0, 0, 0, 0]
      }
    }
  }
  static getVectorInWorld() {
    return MathHelper.getRandomVector(config.WORLD.SIZE);
  }

  static createSideScroller() {
    let pos = this.getVectorInWorld().copyValues();
    let size = MathHelper.getRandomInt(20, 6);
    size += size % 2;
    let xVelocity = MathHelper.speedPerSecond(size);
    return {
      ...EntityFactory.createMovingEntity(pos, [xVelocity, 0]),
      ...this.createRectModel(size, "#ffffff20"),
      wrapAroundWorld: true
    }
  }

  static createMouseFollower() {
    let pos = this.getVectorInWorld().copyValues();
    // let size = MathHelper.getRandomInt(12, 6);
    let size = 10;
    return {
      ...EntityFactory.createAcceleratingEntity(pos),
      ...this.createRectModel(size, MathHelper.getRandomColor()),
      wrapAroundWorld: true,
      // keepInWorld: true,
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
      explosionRadius: 1000,
      explosionModel: {
        color: MathHelper.getRandomColor(),
        radius: 500,
        lifeTime: 1000,
        progress: 0
      }
    }
  }

  static createAnimatedStar() {
    let pos = this.getVectorInWorld().copyValues();
    let numSpikes = MathHelper.getRandomInt(8, 4);
    let lifeTimeInSeconds = MathHelper.getRandomInt(10, 5);
    let direction = MathHelper.getRandomBool() ? 1 : -1;
    let rotationAngle = 360 / numSpikes / lifeTimeInSeconds;
    let rotationSpeed = direction * MathHelper.degreesPerSec(rotationAngle);
    let minRadius = MathHelper.getRandomInt(20, 10);
    let maxRadius = MathHelper.getRandomInt(100, 50);
    let xVelocity = MathHelper.speedPerSecond(minRadius);
    let lifeTime = lifeTimeInSeconds * 1000;

    return {
      ...EntityFactory.createMovingEntity(pos, [xVelocity, 0]),
      wrapAroundWorld: true,
      starAnimation: {
        lifeTime, numSpikes, minRadius, rotationSpeed, maxRadius,
        progress: MathHelper.getRandomInt(lifeTime),
        color: "#fff",
        opacityFactor: 0.2,
        cachedDrawing: document.createElement("canvas")
      }
    }
  }

  static createRotatingGradient(start: number, speed: number, radius: GradientRadius, shiftX: GradientShiftX, shiftY: GradientShiftY, stops: GradientStops) {
    let config: RotatingGradientConfig = { start, speed, shiftX, shiftY, radius, stops };
    return {
      ...EntityFactory.createBasicEntity(),
      gradient: new RotatingGradient(config)
    }
  }
}
