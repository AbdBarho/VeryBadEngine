import Entity, { ComponentName } from "../entity";
import ISystem from "./iSystem";

export default class System implements ISystem {
  required: ComponentName[];
  entities: { [ID: string]: Entity } = {};

  /**
   * @param required required components, if nothing given, the system will accept all entities
   */
  constructor(required: ComponentName[]) {
    this.required = required;
  }

  init() {
    //nothing
  }

  protected isCompatible(entity: Entity) {
    for (let i = 0, len = this.required.length; i < len; i++)
      if (!(this.required[i] in entity))
        return false;
    return true;
  }

  addIfCompatible(entity: Entity) {
    if (this.isCompatible(entity)) {
      this.entities[entity.ID] = entity;
      return true;
    } else {
      delete this.entities[entity.ID];
      return false;
    }
  }

  removeEntity(entityID: string) {
    delete this.entities[entityID];
  }

  update(dt: number) {
    for (let id in this.entities)
      this.updateEntity(this.entities[id], dt);
  }

  updateEntity(entity: Entity, dt: number) {
    //nothing
  }

  destroy() {
    //nothing
  }
}
