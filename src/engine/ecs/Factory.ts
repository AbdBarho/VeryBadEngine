import IDGenerator from "../services/IDGenerator";
import { getV2 } from "../math/VectorTypes";

export default class EntityFactory {
  static createBasicEntity() {
    return {
      ID: IDGenerator.getId(),
      hasChanged: false
    }
  }

  static createMovingEntity(pos = getV2(), vel = getV2()) {
    return {
      ...this.createBasicEntity(),
      position: pos,
      velocity: vel
    };
  }

  static createAcceleratingEntity(pos = getV2(), vel = getV2(), acc = getV2()) {
    return {
      ...this.createMovingEntity(pos, vel),
      acceleration: acc
    }
  }
}
