import Vector from "../math/Vector";
import IDGenerator from "../services/IDGenerator";

export default class EntityFactory {
  static createBasicEntity() {
    return {
      ID: IDGenerator.getId(),
      hasChanged: false
    }
  }

  static createMovingEntity(pos: number[] = [], vel: number[] = []) {
    return {
      ...this.createBasicEntity(),
      position: Vector.create(...pos),
      velocity: Vector.create(...vel)
    };
  }

  static createAcceleratingEntity(pos: number[] = [], vel: number[] = [], acc: number[] = []) {
    return {
      ...this.createMovingEntity(pos, vel),
      acceleration: Vector.create(...acc)
    }
  }
}
