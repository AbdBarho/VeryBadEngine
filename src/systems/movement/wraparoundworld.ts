import System from "../../ecs/system/system";
import Vector from "../../math/vector";
import Entity from "../../ecs/entity";
import Config from "../../config/config";

interface WrappedEntity extends Entity{
  position: Vector;
  wrapAroundWorld: boolean;
}
const WORLD_SIZE = Config.WORLD.SIZE;

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
