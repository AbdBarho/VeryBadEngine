import System from "./system";
import Entity from "./entity";

export default class ECS {
  systems: System[] = [];
  entities: { [ID: string]: Entity } = {};


  addEntity(entity: Entity) {
    for (let i = 0, len = this.systems.length; i < len; i++)
      this.systems[i].processCompatibility(entity);
    this.entities[entity.ID] = entity;
  }

  reCheckEntity(entity: Entity) {
    return this.addEntity(entity);
  }

  removeEntity(entityID: string) {
    for (let i = 0, len = this.systems.length; i < len; i++)
      this.systems[i].removeEntity(entityID);
    delete this.entities[entityID];
  }

  update(dt: number) {
    for (let i = 0, len = this.systems.length; i < len; i++)
      this.systems[i].update(dt);
  }
}