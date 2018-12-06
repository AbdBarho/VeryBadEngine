import ISystem from "./iSystem";
import System from "./system";
import Entity, { ComponentName } from "../entity";

export default class CascadingSystem extends System {
  systems: ISystem[];
  constructor(systems: ISystem[]) {
    super([]);
    this.systems = systems;
  }

  addIfCompatible(entity: Entity) {
    if (this.isCompatible(entity))
      for (let i = 0, len = this.systems.length; i < len; i++)
        if (this.systems[i].addIfCompatible(entity))
          return true;
    return false;
  }

  update(dt: number) {
    for (let i = 0, len = this.systems.length; i < len; i++)
      this.systems[i].update(dt);
  }

  removeEntity(entityID: string) {
    for (let i = 0, len = this.systems.length; i < len; i++)
      this.systems[i].removeEntity(entityID);
  }
}
