import System from "../../ecs/system/system";
import Entity from "../../ecs/entity";
import Vector from "../../math/vector";
import { RectangularModel } from "../../ecs/component";
import Config from "../../config/config";

const WORLD_EDGES = Vector.create(Config.WORLD.SIZE.slice());

interface KeepInWorldRectangle extends Entity {
  position: Vector;
  keepInWorld: boolean;
  rectModel: RectangularModel;
}

export default class KeepInWorld extends System {
  constructor() {
    super(["position", "keepInWorld", "rectModel"]);
  }

  updateEntity(entity: KeepInWorldRectangle) {
    if (entity.hasChanged)
      entity.position.limitByMinMax(entity.rectModel.centerShift, WORLD_EDGES);
  }
}
