import Config from "../../config/config";
import IDGenerator from "../../factory/idGenerator";
import MathHelper from "../../math/math";
import Vector from "../../math/vector";

export default class EntityFactory {
  static createBasicEntity() {
    return {
      ID: IDGenerator.getId(),
      hasChanged: false
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
