import ISystem from "./iSystem";
import Entity, { ComponentName } from "../entity";

interface Group {
  name: string;
  components: ComponentName[];
}

export default class MultiSystem implements ISystem {
  groups: Group[];
  entities: { [group: string]: { [id: string]: Entity } } = {};

  constructor(groups: Group[]) {
    this.groups = groups;
    for (let group of groups)
      this.entities[group.name] = {};
  }

  private checkCompatibility(group: Group, entity: Entity) {
    for (let i = 0, len = group.components.length; i < len; i++)
      if (!(group.components[i] in entity))
        return false;
    return true;
  }

  processCompatibility(entity: Entity) {
    if (this.groups.length === 0)
      return;

    for (let i = 0; i < this.groups.length; i++) {
      const group = this.groups[i];
      if (this.checkCompatibility(group, entity))
        this.entities[group.name][entity.ID] = entity;
      else
        delete this.entities[group.name][entity.ID];
    }
  }

  removeEntity(entityID: string) {
    for (let i = 0; i < this.groups.length; i++)
      delete this.entities[this.groups[i].name][entityID];
  }

  update(dt: number) {

  }

  destroy() {
    //nothing
  }
}
