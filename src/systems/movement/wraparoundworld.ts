import System from "../../ecs/system/system";
import Vector from "../../math/vector";
import IEntity from "../../ecs/entity";
import initconfig from "../../config/initconfig";

interface WrappedEntity extends IEntity{
  position: Vector;
  wrapAroundWorld: boolean;
}
const WORLD_SIZE = initconfig.WORLD.SIZE;

export default class WrapAroundWorld extends System {
  constructor() {
    super(["wrapAroundWorld", "position"]);
  }

  updateEntity(entity: WrappedEntity) {
    if (!entity.hasChanged)
      return;
    let pos = entity.position;
    for (let i = 0; i < WORLD_SIZE.length; i++)
      pos.values[i] = (pos.values[i] + WORLD_SIZE[i]) % WORLD_SIZE[i];
  }
}