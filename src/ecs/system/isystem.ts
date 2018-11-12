import Entity from "../entity";

export default interface ISystem {
  init: () => any;
  update: (dt: number) => any;
  processCompatibility: (entity: Entity) => any;
  removeEntity: (entityId: string) => any;
  destroy: () => any;
}
