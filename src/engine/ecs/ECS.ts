import Entity, { Component } from "./Entity";
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
    const newDt = dt * this.timeScale;
    for (let i = 0, len = this.systems.length; i < len; i++)
      this.systems[i].update(newDt);
  }

  processAndReset(dt: number) {
    this.update = this.updateSystems;
    this.processQueue();
    this.updateSystems(dt);
  }

  update(dt: number) {
    this.updateSystems(dt);
  }

  modifyEntities(required: Component[], notAllowed: Component[], callback: (e: Entity) => void) {

    let modified = Object.values(this.entities);
    if (required.length)
      modified = modified.filter(e => required.every(component => e.hasOwnProperty(component)));
    if (notAllowed.length)
      modified = modified.filter(e => !notAllowed.some(component => e.hasOwnProperty(component)));
    for (const e of modified)
      callback(e);
    modified.forEach(e => this.reCheckEntity(e));

  }
}
