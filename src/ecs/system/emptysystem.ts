import ISystem from "./isystem";
import IEntity from "../entity";

export default class EmptySystem implements ISystem {
  update(dt: number) { }
  processCompatibility(entity: IEntity) { }
  removeEntity(entityId: string) { }
}