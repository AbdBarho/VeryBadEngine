import { RectangularModel } from "../../engine/ecs/components/Component";
import Entity from "../../engine/ecs/Entity";
import System from "../../engine/ecs/system/System";
import Vector from "../../engine/math/Vector";
import Vec2 from "../../engine/math/vector/Vec2";
import Config from "./LevelConfig";

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
