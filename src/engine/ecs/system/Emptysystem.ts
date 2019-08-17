import Entity from "../Entity";
import ISystem from "./ISystem";

export default class EmptySystem implements ISystem {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  addIfCompatible(entity: Entity) { return false }
  removeEntity(entityId: string) { }
  init() { }
  update(dt: number) { }
  destroy() { }
}
