import Entity from "../../engine/ecs/Entity";
import System from "../../engine/ecs/system/System";
import Vec2 from "../../engine/math/vector/Vec2";
import Config from "./LevelConfig";

interface WrappedEntity extends Entity{
  position: Vec2;
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
    const pos = entity.position;
    pos.x = (pos.x + WORLD_SIZE[0]) % WORLD_SIZE[0];
    pos.y = (pos.y + WORLD_SIZE[1]) % WORLD_SIZE[1];
  }
}
