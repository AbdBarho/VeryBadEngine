import Entity from "./Entity";
import ISystem from "./system/ISystem";


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

  private addEntity(entity: Entity) {
    for (let i = 0, len = this.systems.length; i < len; i++)
      this.systems[i].addIfCompatible(entity);
    this.entities[entity.ID] = entity;
  }

  queueEntity(entity: Entity) {
    this.queuedEntities.push(entity);
    this.update = this.processAndReset;
  }

  reCheckEntity(entity: Entity) {
    return this.addEntity(entity);
  }

  removeEntity(entityID: string) {
    for (let i = 0, len = this.systems.length; i < len; i++)
      this.systems[i].removeEntity(entityID);
    delete this.entities[entityID];
  }

  processQueue() {
    for (let i = 0, len = this.queuedEntities.length; i < len; i++)
      this.addEntity(this.queuedEntities[i]);
    this.queuedEntities = [];
  }

  updateSystems(dt: number) {
    for (let i = 0, len = this.systems.length; i < len; i++)
      this.systems[i].update(dt * this.timeScale);
  }

  processAndReset(dt: number) {
    this.processQueue();
    this.updateSystems(dt);
    this.update = this.updateSystems;
  }

  update(dt: number) {
    this.updateSystems(dt);
  }
}
