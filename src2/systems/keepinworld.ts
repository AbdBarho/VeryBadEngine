import System from "../ecs/system/system";
import IEntity from "../ecs/entity";
import Vector from "../math/vector";
import { RectangularModel } from "../ecs/component";
import initconfig from "../config/initconfig";

const WORLD_EDGES = new Vector(initconfig.WORLD.SIZE.slice());

interface KeepInWorldRectangle extends IEntity {
  position: Vector;
  keepInWorld: boolean;
  rectModel: RectangularModel;
}

export default class KeepInWorld extends System {
  constructor() {
    super(["position", "keepInWorld", "rectModel"]);
  }


  updateEntity(enitity: KeepInWorldRectangle) {
    enitity.position.limitByMinMax(enitity.rectModel.centerShift, WORLD_EDGES);
  }
}