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
    let numSpikes = MathHelper.getRandomInt(8, 3);
    let lifeTimeInSeconds = MathHelper.getRandomInt(10, 4);
    let rotationSpeed = MathHelper.degreesPerSec(360 / numSpikes / lifeTimeInSeconds);
    return {
      ...this.createBasicEntity(),
      wrapAroundWorld: true,
      position: MathHelper.getRandomVector(Config.WORLD.SIZE),
      velocity: Vector.create([MathHelper.speedPerSecond(MathHelper.getRandomInt(75, 1)), 0]),
      starAnimation: {
        progress: 0,
        lifeTime: lifeTimeInSeconds * 1000,
        numSpikes,
        rotationSpeed,
        minRadius: MathHelper.getRandomInt(20, 10),
        maxRadius: MathHelper.getRandomInt(100, 50),
        color: "rgb(255, 255, 255)"
      }
    }
  }
}
