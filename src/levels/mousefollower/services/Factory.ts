import config from "../Config";
import EntityFactory from "../../../engine/ecs/Factory";
import MathHelper from "../../../engine/math/Math";
import { V2, getV2 } from "../../../engine/math/VectorTypes";
import { Color, Flag, GradientRadius, GradientShiftX, GradientShiftY, GradientStops, RotatingGradient, StarAnimation } from "../../../engine/ecs/components/Component";
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
    return MathHelper.randomV2Int(config.WORLD.SIZE);
  }

  static createSideScroller() {
    const pos = this.getVectorInWorld();
    let size = MathHelper.getRandomInt(20, 4);
    size += size % 2;
    const xVelocity = MathHelper.speedPerSecond(size);
    return {
      ...EntityFactory.createMovingEntity(pos, { x: xVelocity, y: 0 }),
      ...this.createRectModel(size, "#ffffff20"),
      wrapAroundWorld: <Flag>true
    }
  }

  static createMouseFollower() {
    const pos = this.getVectorInWorld();
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
      position: getV2(),
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
    const pos = this.getVectorInWorld();
    const xVelocity = MathHelper.speedPerSecond(MathHelper.getSignedRandom(10, 15));

    return {
      ...EntityFactory.createMovingEntity(pos, { x: Math.abs(xVelocity), y: 0 }),
      wrapAroundWorld: true,
      starAnimation: {
        borderBox: <V2>{ x: maxRadius * 2, y: maxRadius * 2 },
        progress: MathHelper.getRandomInt(lifeTime),
        lifeTime,
        numFrames,
        cache
      } as StarAnimation
    }
  }

  static createRotatingGradient(size: V2, angle: number, speed: number, radius: GradientRadius, shiftX: GradientShiftX, shiftY: GradientShiftY, levels: GradientStops) {
    const colors = Object.values(levels);
    const stops = Object.keys(levels).map(key => parseInt(key) / 100);
    return {
      ...EntityFactory.createBasicEntity(),
      rotatingGradient: { size, angle, speed, radius, shiftX, shiftY, stops, colors} as RotatingGradient
    }
  }
}
