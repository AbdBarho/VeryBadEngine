import Entity from "./entity";
import ISystem from "./system/iSystem";


export default class ECS {
  systems: ISystem[] = [];
  queuedEntities: Entity[] = [];
  entities: { [ID: string]: Entity } = {};
  timeScale = 1;

  init() {
    for (let i = 0, len = this.systems.length; i < len; i++)
      this.systems[i].init();
  }

  destroy() {
    for (let i = 0, len = this.systems.length; i < len; i++)
      this.systems[i].destroy();
  }

  /**
   * WARNING: should only be used before the level starts, it might cause errors
   * @param entity
   */
  addEntity(entity: Entity) {
    for (let i = 0, len = this.systems.length; i < len; i++)
      this.systems[i].addIfCompatible(entity);
    this.entities[entity.ID] = entity;
  }

  queueEntity(entity: Entity) {
    this.queuedEntities.push(entity);
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
    if (this.queuedEntities.length) {
      for (let i = 0, len = this.queuedEntities.length; i < len; i++)
        this.addEntity(this.queuedEntities[i]);
      this.queuedEntities = [];
    }
    for (let i = 0, len = this.systems.length; i < len; i++)
      this.systems[i].update(dt * this.timeScale);
  }
}
