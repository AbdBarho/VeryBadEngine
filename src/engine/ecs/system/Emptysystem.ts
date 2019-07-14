import Entity from "../Entity";
import ISystem from "./ISystem";

export default class EmptySystem implements ISystem {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  
  init() { }
  update(dt: number) { }
  addIfCompatible(entity: Entity) { return false }
  removeEntity(entityId: string) { }
  destroy() { }
}
