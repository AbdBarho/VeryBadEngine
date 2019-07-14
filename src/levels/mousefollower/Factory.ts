import config from "./LevelConfig";
import RotatingGradient, { GradientRadius, GradientShiftX, GradientShiftY, GradientStops, RotatingGradientConfig } from "../../engine/ecs/components/gradient/RotatingGradient";
import EntityFactory from "../../engine/ecs/Factory";
import MathHelper from "../../engine/math/Math";
import Vector from "../../engine/math/Vector";

export default class MouseFollowerFactory {
  static createRectModel(sideLength: number, color: string) {
    const half = sideLength / 2;
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
    const pos = this.getVectorInWorld().copyValues();
    let size = MathHelper.getRandomInt(20, 4);
    size += size % 2;
    const xVelocity = MathHelper.speedPerSecond(size);
    return {
      ...EntityFactory.createMovingEntity(pos, [xVelocity, 0]),
      ...this.createRectModel(size, "#ffffff20"),
      wrapAroundWorld: true
    }
  }

  static createMouseFollower() {
    const pos = this.getVectorInWorld().copyValues();
    const size = MathHelper.getRandomInt(14, 8);
    return {
      ...EntityFactory.createAcceleratingEntity(pos),
      ...this.createRectModel(size, MathHelper.getRandomColor()),
      wrapAroundWorld: true,
      // keepInWorld: true,
      mouseFollower: true,
      explodes: true,
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
      explosionRadius: 500,
      explosionModel: {
        color: MathHelper.getRandomColor(),
        radius: 250,
        lifeTime: 1000,
        progress: 0
      }
    }
  }

  static createAnimatedStar() {
    const pos = this.getVectorInWorld().copyValues();
    const numSpikes = MathHelper.getRandomInt(8, 4);
    const lifeTimeInSeconds = MathHelper.getRandomInt(10, 5);
    const direction = MathHelper.getRandomBool() ? 1 : -1;
    const rotationAngle = 360 / numSpikes / lifeTimeInSeconds;
    const rotationSpeed = direction * MathHelper.degreesPerSec(rotationAngle);
    const minRadius = MathHelper.getRandomInt(20, 10);
    const maxRadius = MathHelper.getRandomInt(100, 50);
    const xVelocity = MathHelper.speedPerSecond(minRadius * 2);
    const lifeTime = lifeTimeInSeconds * 1000;
    const color = '#fff';
    const cache = drawStar(numSpikes, minRadius, maxRadius, color)

    return {
      ...EntityFactory.createMovingEntity(pos, [xVelocity, 0]),
      wrapAroundWorld: true,
      starAnimation: {
        //star
        numSpikes, minRadius, maxRadius,
        //animation
        progress: MathHelper.getRandomInt(lifeTime),
        lifeTime, rotationSpeed,
        opacityFactor: 0.3,
        //cache
        cache
      }
    }
  }

  static createRotatingGradient(start: number, speed: number, radius: GradientRadius, shiftX: GradientShiftX, shiftY: GradientShiftY, stops: GradientStops) {
    const config: RotatingGradientConfig = { start, speed, shiftX, shiftY, radius, stops };
    return {
      ...EntityFactory.createBasicEntity(),
      gradient: new RotatingGradient(config)
    }
  }
}



function drawStar(numSpikes: number, minRadius: number, maxRadius: number, fillStyle: string): OffscreenCanvas {
  const cache = new OffscreenCanvas(maxRadius * 2, maxRadius * 2);
  const ctx = cache.getContext("2d") as OffscreenCanvasRenderingContext2D;
  ctx.beginPath();
  ctx.fillStyle = fillStyle;
  ctx.translate(maxRadius, maxRadius);
  ctx.moveTo(0, 0 - minRadius);
  for (let i = 0; i < numSpikes; i++) {
    ctx.rotate(Math.PI / numSpikes);
    ctx.lineTo(0, 0 - maxRadius);
    ctx.rotate(Math.PI / numSpikes);
    ctx.lineTo(0, 0 - minRadius);
  }
  ctx.fill();
  ctx.closePath();
  return cache;
}
