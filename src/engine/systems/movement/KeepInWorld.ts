import Config from "../../config/Config";
import { RectangularModel } from "../../ecs/components/Component";
import Entity from "../../ecs/Entity";
import System from "../../ecs/system/System";
import Vector from "../../math/Vector";
import Vec2 from "../../math/vector/Vec2";

const WORLD_EDGES = Vector.create(...Config.WORLD.SIZE.slice());

interface KeepInWorldRectangle extends Entity {
  position: Vec2;
  keepInWorld: boolean;
  rectModel: RectangularModel;
}

export default class KeepInWorld extends System {
  constructor() {
    super("KeepInWorld", ["position", "keepInWorld", "rectModel"]);
  }

  updateEntity(entity: KeepInWorldRectangle) {
    if (entity.hasChanged)
      entity.position.limitByMinMax(entity.rectModel.centerShift, WORLD_EDGES);
  }
}
