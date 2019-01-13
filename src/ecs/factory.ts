import Config from "../config/Config";
import MathHelper from "../math/Math";
import Vector, { VectorInitializer } from "../math/Vector";
import IDGenerator from "../services/IDGenerator";

export default class EntityFactory {
  static createBasicEntity() {
    return {
      ID: IDGenerator.getId(),
      hasChanged: false
    }
  }

  static createMovingEntity(pos: VectorInitializer, vel: VectorInitializer) {
    return {
      ...this.createBasicEntity(),
      position: Vector.create(pos),
      velocity: Vector.create(vel)
    };
  }

  static createAcceleratingEntity(pos: VectorInitializer, vel: VectorInitializer, acc: VectorInitializer) {
    return {
      ...this.createMovingEntity(pos, vel),
      acceleration: Vector.create(acc)
    }
  }

  static getVectorInWorld() {
    return MathHelper.getRandomVector(Config.WORLD.SIZE);
  }
}
