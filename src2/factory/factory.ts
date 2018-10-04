import Entity from "../ecs/entity";
import Vector from "../math/vector";
import IDGenerator from "./idgenerator";
import MathHelper from "../math/math";

const speedPerSecond = (val: number) => val / 1000;
const accelerationPerSecond = (val: number) => val * (1000 ** 2);

export default class EntityFactory {
  static createRect(): Entity {
    return {
      ID: IDGenerator.getId(),
      hasChanged: false,
      isFrozen: false,
      position: new Vector(2),
      velocity: new Vector(2),
      acceleration: new Vector(2),
      rectModel: {
        size: new Vector([20, 20]),
        centerShift: new Vector([10, 10]),
        color: MathHelper.getRandomColor(),
        cachedDimensions: [0, 0, 0, 0]
      }
    }
  }

  static createMouseFollower(): Entity {
    return {
      ...this.createRect(),
      mouseFollower: true,
      position: MathHelper.getRandomVector([1920, 1080]),
      maxAcceleration: accelerationPerSecond(1000),
      maxVelocity: speedPerSecond(500)
    }
  }
}