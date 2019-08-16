import Entity, { ComponentName as CN } from "../Entity";
import EmptySystem from "./Emptysystem";

export default class System extends EmptySystem {
  required: CN[];
  notAllowed: CN[];
  entities: { [ID: string]: Entity } = {};
  /**
   * @param required required components, if nothing given, the system will accept all entities
   */
  constructor(name: string, required: CN[] = [], notAllowed: CN[] = []) {
    super(name);
    this.required = required;
    this.notAllowed = notAllowed;
  }

  protected isCompatible(entity: Entity) {
    if (this.required.length && this.required.some(component => !(component in entity)))
      return false;

    if (this.notAllowed.length && this.notAllowed.some(component => component in entity))
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
}
