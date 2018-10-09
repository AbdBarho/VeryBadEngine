import ISystem from "./isystem";
import IEntity, { ComponentName } from "../entity";

interface Group {
  name: string;
  compontents: ComponentName[];
}

export default class MultiSystem implements ISystem {
  groups: Group[];
  entities: { [group: string]: { [id: string]: IEntity } } = {};

  constructor(groups: Group[]) {
    this.groups = groups;
    for (let group of groups)
      this.entities[group.name] = {};
  }

  private checkCompatibility(group: Group, entity: IEntity) {
    for (let i = 0, len = group.compontents.length; i < len; i++)
      if (!(group.compontents[i] in entity))
        return false;
    return true;
  }

  processCompatibility(entity: IEntity) {
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