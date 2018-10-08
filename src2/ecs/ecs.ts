import IEntity from "./entity";
import  ISystem  from "./system/isystem";


export default class ECS {
  systems: ISystem[] = [];
  queuedEntities: IEntity[] = [];
  entities: { [ID: string]: IEntity } = {};


  private addEntity(entity: IEntity) {
    for (let i = 0, len = this.systems.length; i < len; i++)
      this.systems[i].processCompatibility(entity);
    this.entities[entity.ID] = entity;
  }

  queueEntity(entity: IEntity) {
    this.queuedEntities.push(entity);
  }

  reCheckEntity(entity: IEntity) {
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
      this.systems[i].update(dt);
  }
}