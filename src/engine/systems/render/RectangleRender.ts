import Entity from "../../ecs/Entity";
import System from "../../ecs/system/System";
import Vector from "../../math/Vector";
import Vec2 from "../../math/vector/Vec2";
import Frame from "../../core/canvas/layers/Frame";
import { Flag, Color } from "../../ecs/components/Component";
import { V2 } from "../../math/vector/VectorTypes";

interface RectangleModelObject extends Entity {
  position: Vec2
  rectModel: Flag
  rectColor: Color
  borderBox: V2
}

export default class RectangleRenderer extends System {
  frame: Frame;
  constructor(frame: Frame) {
    super("RectangleRender", ["position", "rectModel", "rectColor", "borderBox"]);
    this.frame = frame;
  }

  updateEntity(entity: RectangleModelObject, dt: number) {
    const pos = entity.position.toV2();
    const box = entity.borderBox;
    this.frame.fillRect(pos.x - (box.x / 2), pos.y - (box.y / 2), box.x, box.y, entity.rectColor);
  }
}
