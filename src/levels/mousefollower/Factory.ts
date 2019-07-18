import config from "./LevelConfig";
import RotatingGradient, { GradientRadius, GradientShiftX, GradientShiftY, GradientStops, RotatingGradientConfig } from "../../engine/ecs/components/gradient/RotatingGradient";
import EntityFactory from "../../engine/ecs/Factory";
import MathHelper from "../../engine/math/Math";
import Vector from "../../engine/math/Vector";
import { V2 } from "../../engine/math/vector/VectorTypes";
import { Color, Flag } from "../../engine/ecs/components/Component";
import CacheDrawer from "./CacheDrawer";

export default class MouseFollowerFactory {
  static createRectModel(sideLength: number, color: string) {
    return {
      rectModel: <Flag>true,
      borderBox: <V2>{ x: sideLength, y: sideLength },
      rectColor: <Color>color
    }
  }

  static getVectorInWorld() {
    return MathHelper.getRandomVector(config.WORLD.SIZE);
  }

  static createSideScroller() {
    const pos = this.getVectorInWorld().toV2();
    let size = MathHelper.getRandomInt(20, 4);
    size += size % 2;
    const xVelocity = MathHelper.speedPerSecond(size);
    return {
      ...EntityFactory.createMovingEntity([pos.x, pos.y], [xVelocity, 0]),
      ...this.createRectModel(size, "#ffffff20"),
      wrapAroundWorld: <Flag>true
    }
  }

  static createMouseFollower() {
    const pos = this.getVectorInWorld().copyValues();
    const size = MathHelper.getRandomInt(14, 8);
    return {
      ...EntityFactory.createAcceleratingEntity(pos),
      ...this.createRectModel(size, MathHelper.getRandomColor()),
      wrapAroundWorld: <Flag>true,
      // keepInWorld: true,
      mouseFollower: <Flag>true,
      explodes: <Flag>true,
      maxAcceleration: MathHelper.accelerationPerSecond(1000),
      maxVelocity: MathHelper.speedPerSecond(500)
    }
  }

  static createExplosion() {
    return {
      ...EntityFactory.createBasicEntity(),
      position: Vector.create(2),
      explosion: <Flag>true,
      explosionVelocity: MathHelper.speedPerSecond(500) * 2, // * 2 to counter v0
      explosionRadius: 500,
      explosionModel: {
        color: <Color>MathHelper.getRandomColor(),
        radius: 250,
        lifeTime: 1000,
        progress: 0
      }
    }
  }

  static createAnimatedStar() {
    const numSpikes = MathHelper.getRandomInt(8, 4);
    const lifeTimeInSeconds = MathHelper.getRandomInt(10, 5);
    const minRadius = MathHelper.getRandomInt(10, 2);
    const maxRadius = MathHelper.getRandomInt(50, 30);
    const lifeTime = lifeTimeInSeconds * 1000;
    const fillStyle = '#fff';
    const opacityFactor = 0.4;
    const numFrames = 60;
    const rotationDirection = MathHelper.getRandomBool() ? 1 : -1;
    const cache = CacheDrawer.drawStar({
      fillStyle,
      lifeTime,
      maxRadius,
      minRadius,
      numFrames,
      numSpikes,
      opacityFactor,
      rotationDirection
    })
    const pos = this.getVectorInWorld().copyValues();
    const xVelocity = MathHelper.speedPerSecond(MathHelper.getSignedRandom(10, 15));

    return {
      ...EntityFactory.createMovingEntity(pos, [Math.abs(xVelocity), 0]),
      wrapAroundWorld: true,
      starAnimation: {
        borderBox: <V2>{ x: maxRadius * 2, y: maxRadius * 2 },
        progress: MathHelper.getRandomInt(lifeTime),
        lifeTime,
        numFrames,
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
