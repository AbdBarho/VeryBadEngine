import Config from "../../config/Config";
import Entity from "../../ecs/Entity";
import System from "../../ecs/system/System";
import Update from "../../ecs/system/Update";
import Vector from "../../math/Vector";
import Vec2 from "../../math/vector/Vec2";

interface WrappedEntity extends Entity{
  position: Vec2;
  wrapAroundWorld: boolean;
}
const WORLD_SIZE = Config.WORLD.SIZE;

export default class WrapAroundWorld extends System {
  constructor() {
    super("WrapAroundWorld", Update.every, ["wrapAroundWorld", "position"]);
  }

  updateEntity(entity: WrappedEntity) {
    if (!entity.hasChanged)
      return;
    let pos = entity.position;
    pos.x = (pos.x + WORLD_SIZE[0]) % WORLD_SIZE[0];
    pos.y = (pos.y + WORLD_SIZE[1]) % WORLD_SIZE[1];
  }
}
