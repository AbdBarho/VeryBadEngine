import Entity from "../entity";
import ISystem from "./iSystem";

export default class EmptySystem implements ISystem {
  init() { }
  update() { }
  addIfCompatible(entity: Entity) {
    // do not accept any entity, it should be empty
    return false;
  }
  removeEntity(entityId: string) { }
  destroy() { }
}
