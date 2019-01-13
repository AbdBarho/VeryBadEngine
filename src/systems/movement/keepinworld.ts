import Config from "../../config/Config";
import { RectangularModel } from "../../ecs/Component";
import Entity from "../../ecs/Entity";
import System from "../../ecs/system/System";
import Update from "../../ecs/system/Update";
import Vector from "../../math/Vector";

const WORLD_EDGES = Vector.create(Config.WORLD.SIZE.slice());

interface KeepInWorldRectangle extends Entity {
  position: Vector;
  keepInWorld: boolean;
  rectModel: RectangularModel;
}

export default class KeepInWorld extends System {
  constructor() {
    super("KeepInWorld", Update.every, ["position", "keepInWorld", "rectModel"]);
  }

  updateEntity(entity: KeepInWorldRectangle) {
    if (entity.hasChanged)
      entity.position.limitByMinMax(entity.rectModel.centerShift, WORLD_EDGES);
  }
}
