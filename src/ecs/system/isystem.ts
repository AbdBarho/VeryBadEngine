import Entity from "../entity";

export default interface ISystem {
  update: (dt: number) => any;
  processCompatibility: (entity: Entity) => any;
  removeEntity: (entityId: string) => any;
}
