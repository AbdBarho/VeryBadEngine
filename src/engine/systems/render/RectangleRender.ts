import Layer from "../../core/canvas/layers/Layer";
import { RectangularModel } from "../../ecs/components/Component";
import Entity from "../../ecs/Entity";
import System from "../../ecs/system/System";
import Vector from "../../math/Vector";
import Vec2 from "../../math/vector/Vec2";
import Frame from "../../core/canvas/layers/Frame";

interface RectangleModelObject extends Entity {
  position: Vec2;
  rectModel: RectangularModel;
}

export default class RectangleRenderer extends System {
  frame: Frame;
  constructor(frame: Frame) {
    super("RectangleRender", ["position", "rectModel"]);
    this.frame = frame;
  }

  updateEntity(entity: RectangleModelObject, dt: number) {
    if (entity.hasChanged) {
      this.calculate(entity);
      entity.hasChanged = false;
    }
    this.frame.fillRectCompact(entity.rectModel.cachedDimensions, entity.rectModel.color);
  }

  private calculate(entity: RectangleModelObject) {
    let pos = Vector.copy(entity.position)
    let size = entity.rectModel.size;

    pos.subVec(entity.rectModel.centerShift)
    //prevents GC
    let dims = entity.rectModel.cachedDimensions;
    dims[0] = pos.x;
    dims[1] = pos.y;
    dims[2] = size.x;
    dims[3] = size.y;

    Vector.store(pos);
  }
}
