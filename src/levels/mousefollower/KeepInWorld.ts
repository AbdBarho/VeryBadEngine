import Entity from "../../engine/ecs/Entity";
import System from "../../engine/ecs/system/System";
import Vector from "../../engine/math/Vector";
import Vec2 from "../../engine/math/vector/Vec2";
import Config from "./LevelConfig";
import { Flag } from "../../engine/ecs/components/Component";
import { V2 } from "../../engine/math/vector/VectorTypes";

const WORLD_EDGES = Vector.create(...Config.WORLD.SIZE.slice());

interface KeepInWorldRectangle extends Entity {
  position: Vec2;
  keepInWorld: Flag;
  borderBox: V2;
}

export default class KeepInWorld extends System {
  constructor() {
    super("KeepInWorld", ["position", "keepInWorld", "borderBox"]);
  }

  updateEntity(entity: KeepInWorldRectangle) {
    if (entity.hasChanged)
      entity.position.limitByMinMaxNum2d(entity.borderBox.x / 2, entity.borderBox.y / 2, WORLD_EDGES.x, WORLD_EDGES.y);
  }
}
