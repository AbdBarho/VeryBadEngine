import Entity, { ComponentName } from "../Entity";
import EmptySystem from "./EmptySystem";
import Update from "./Update";

interface Group {
  name: string;
  components: ComponentName[];
}

export default class MultiSystem extends EmptySystem {
  groups: Group[];
  entities: { [group: string]: { [id: string]: Entity } } = {};

  constructor(name: string, updateType: Update, groups: Group[]) {
    super(name, updateType);
    if (groups.length < 2)
      throw "Can not create a MultiSystem with less than 2 groups, use System or EmptySystem instead";

    this.groups = groups;
    for (let group of groups)
      this.entities[group.name] = {};
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
      const name = group.name;
      if (this.isCompatible(group, entity)) {
        this.entities[name][entity.ID] = entity;
        accepted = true;
      } else {
        delete this.entities[name][entity.ID];
      }
    }
    return accepted;
  }

  removeEntity(entityID: string) {
    for (let i = 0; i < this.groups.length; i++)
      delete this.entities[this.groups[i].name][entityID];
  }
}
