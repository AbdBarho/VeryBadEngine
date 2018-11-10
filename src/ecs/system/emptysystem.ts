import Entity from "../entity";
import ISystem from "./iSystem";

export default class EmptySystem implements ISystem {
  update(dt: number) { }
  processCompatibility(entity: Entity) { }
  removeEntity(entityId: string) { }
}
