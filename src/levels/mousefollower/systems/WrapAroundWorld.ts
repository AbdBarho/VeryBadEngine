import Entity from "../../../engine/ecs/Entity";
import System from "../../../engine/ecs/system/System";
import Config from "../Config";
import { V2 } from "../../../engine/math/VectorTypes";

interface WrappedEntity extends Entity{
  position: V2;
  wrapAroundWorld: boolean;
}
const WORLD_SIZE = Config.WORLD.SIZE;

export default class WrapAroundWorld extends System {
  constructor() {
    super("WrapAroundWorld", ["wrapAroundWorld", "position"]);
  }

  updateEntity(entity: WrappedEntity) {
    if (!entity.hasChanged)
      return;
    const { x, y } = entity.position;
    entity.position.x = x > WORLD_SIZE.x ? x % WORLD_SIZE.x : x;
    entity.position.y = y > WORLD_SIZE.y ? y % WORLD_SIZE.y : y;
  }
}
