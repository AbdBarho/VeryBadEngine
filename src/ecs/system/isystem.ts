import IEntity from "../entity";

export default interface ISystem {
  update: (dt: number) => any;
  processCompatibility: (entity: IEntity) => any;
  removeEntity: (entityId: string) => any;
}