import System from "./system";
import Entity from "./entity";

export default class ECS {
  systems: System[] = [];
  entities: { [ID: string]: Entity } = {};


  addEntity(entity: Entity) {
    for (let i = 0, len = this.systems.length; i < len; i++)
      this.systems[i].processCompatibility(entity);
  }

  reCheckEntity(entity: Entity) {
    return this.addEntity(entity);
  }

  removeEntity(entity: Entity) {
    for (let i = 0, len = this.systems.length; i < len; i++)
      this.systems[i].removeEntity(entity);
  }

  update(dt: number) {
    for (let i = 0, len = this.systems.length; i < len; i++)
      this.systems[i].update(dt);
  }
}