import { Color, Flag, GradientRadius, GradientShiftX, GradientShiftY, GradientStops, RotatingGradient, StarAnimation } from "../../../engine/ecs/components/Component";
import EntityFactory from "../../../engine/ecs/Factory";
import { accelerationPerSecond, getRandomBool, getRandomColor, getRandomInt, getSignedRandom, randomV2Int, speedPerSecond } from "../../../engine/math/Math";
import { getV2, V2 } from "../../../engine/math/VectorTypes";
import config from "../Config";
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
    return randomV2Int(config.WORLD.SIZE);
  }

  static createSideScroller() {
    const pos = this.getVectorInWorld();
    let size = getRandomInt(20, 4);
    size += size % 2;
    const xVelocity = speedPerSecond(size);
    return {
      ...EntityFactory.createMovingEntity(pos, { x: xVelocity, y: 0 }),
      ...this.createRectModel(size, "#ffffff20"),
      wrapAroundWorld: <Flag>true
    }
  }

  static getRandomColor() {
    return getRandomColor();
  }

  static createMouseFollower() {
    const pos = this.getVectorInWorld();
    const size = getRandomInt(14, 8);
    return {
      ...EntityFactory.createAcceleratingEntity(pos),
      ...this.createRectModel(size, getRandomColor()),
      wrapAroundWorld: <Flag>true,
      // keepInWorld: true,
      mouseFollower: <Flag>true,
      explodes: <Flag>true,
      maxAcceleration: accelerationPerSecond(1000),
      maxVelocity: speedPerSecond(500)
    }
  }

  static createExplosion() {
    return {
      ...EntityFactory.createBasicEntity(),
      position: getV2(),
      explosion: <Flag>true,
      explosionVelocity: speedPerSecond(500) * 2, // * 2 to counter v0
      explosionRadius: 500,
      explosionModel: {
        color: <Color> getRandomColor(),
        radius: 250,
        lifeTime: 1000,
        progress: 0
      }
    }
  }

  static createAnimatedStar() {
    const numSpikes = getRandomInt(8, 4);
    const lifeTimeInSeconds = getRandomInt(10, 5);
    const minRadius = getRandomInt(10, 2);
    const maxRadius = getRandomInt(50, 30);
    const lifeTime = lifeTimeInSeconds * 1000;
    const fillStyle = '#fff';
    const opacityFactor = 0.4;
    const numFrames = 60;
    const rotationDirection = getRandomBool() ? 1 : -1;
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
    const xVelocity = speedPerSecond(getSignedRandom(10, 15));

    return {
      ...EntityFactory.createMovingEntity(pos, { x: Math.abs(xVelocity), y: 0 }),
      wrapAroundWorld: true,
      starAnimation: {
        borderBox: <V2>{ x: maxRadius * 2, y: maxRadius * 2 },
        progress: getRandomInt(lifeTime),
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
