import Entity from "../Entity";
import ISystem from "./ISystem";
import System from "./System";

export default class CascadingSystem extends System {
  systems: ISystem[];
  constructor(name: string, systems: ISystem[]) {
    let updateType = systems[0].updateType;
    for (let system of systems)
      if (system.updateType !== updateType)
        throw "cannot create CascadingSystem with different update types";
    super(name, updateType, []);
    this.systems = systems;
  }

  addIfCompatible(entity: Entity) {
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

  destroy() {
    for (let i = 0, len = this.systems.length; i < len; i++)
      this.systems[i].destroy();
  }
}
