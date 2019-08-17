import System from "../../../engine/ecs/system/System";
import { sandwich } from "../../../engine/math/Math";
import Config from "../Config";
import { KeepInWorldRectangle } from "../types/Entities";

const WORLD_EDGES = Config.WORLD.SIZE;


export default class KeepInWorld extends System {
  constructor() {
    super("KeepInWorld", ["position", "keepInWorld", "borderBox"]);
  }

  updateEntity(entity: KeepInWorldRectangle) {
    entity.position.x = sandwich(entity.position.x, entity.borderBox.x / 2, WORLD_EDGES.x);
    entity.position.y = sandwich(entity.position.y, entity.borderBox.y / 2, WORLD_EDGES.y);
  }
}
