import Entity, { ComponentName } from "../entity";
import ISystem from "./iSystem";

interface Group {
  name: string;
  components: ComponentName[];
}

export default class MultiSystem implements ISystem {
  groups: Group[];
  entities: { [group: string]: { [id: string]: Entity } } = {};

  constructor(groups: Group[]) {
    if (groups.length < 2)
      throw "Can not create a MultiSystem with less than 2 groups, use System or EmptySystem instead";

    this.groups = groups;
    for (let group of groups)
      this.entities[group.name] = {};
  }

  init() {
    //nothing
  }

  private isCompatible(group: Group, entity: Entity) {
    for (let i = 0, len = group.components.length; i < len; i++)
      if (!(group.components[i] in entity))
        return false;
    return true;
  }

  addIfCompatible(entity: Entity) {
    let accepted = false;
    for (let i = 0; i < this.groups.length; i++) {
      const group = this.groups[i];
      if (this.isCompatible(group, entity)) {
        this.entities[group.name][entity.ID] = entity;
        accepted = true;
      } else {
        delete this.entities[group.name][entity.ID];
      }
    }
    return accepted;
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
