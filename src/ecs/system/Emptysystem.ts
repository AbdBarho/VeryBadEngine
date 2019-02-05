import Entity from "../Entity";
import ISystem from "./ISystem";
import Update from "./Update";

export default class EmptySystem implements ISystem {
  updateType: Update;
  name: string;
  constructor(name: string, update: Update) {
    this.name = name;
    this.updateType = update;
  }
  getName() { return this.name }
  getUpdateFrequency() { return this.updateType }
  init() { }
  update(dt: number) { }
  addIfCompatible(entity: Entity) { return false }
  removeEntity(entityId: string) { }
  destroy() { }
}
