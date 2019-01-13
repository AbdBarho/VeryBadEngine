import Config from "../../config/Config";
import Entity from "../../ecs/Entity";
import System from "../../ecs/system/System";
import Update from "../../ecs/system/Update";
import Vector from "../../math/Vector";

interface WrappedEntity extends Entity{
  position: Vector;
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
    for (let i = 0; i < WORLD_SIZE.length; i++)
      pos.values[i] = (pos.values[i] + WORLD_SIZE[i]) % WORLD_SIZE[i];
  }
}
