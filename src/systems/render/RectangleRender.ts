import Canvas from "../../core/Canvas";
import Layer from "../../core/Layer";
import { RectangularModel } from "../../ecs/Component";
import Entity from "../../ecs/Entity";
import System from "../../ecs/system/System";
import Update from "../../ecs/system/Update";
import Vector from "../../math/Vector";
import Vec2 from "../../math/vector/Vec2";

interface RectangleModelObject extends Entity {
  position: Vec2;
  rectModel: RectangularModel;
}

export default class RectangleRenderer extends System {
  layer: Layer;
  constructor(layer: Layer) {
    super("RectangleRender", Update.every, ["position", "rectModel"]);
    this.layer = layer;
  }

  updateEntity(entity: RectangleModelObject, dt: number) {
    if (entity.hasChanged) {
      this.calculate(entity);
      entity.hasChanged = false;
    }
    this.layer.fillRect(entity.rectModel.cachedDimensions, entity.rectModel.color);
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
