import System from "../../ecs/system/system";
import Entity from "../../ecs/entity";
import { RectangularModel } from "../../ecs/component";
import Canvas from "../../core/canvas";
import Vector from "../../math/vector";
import Layer from "../../core/layer";

interface RectangleModelObject extends Entity {
  position: Vector;
  rectModel: RectangularModel;
}

export default class RectangleRenderer extends System {
  layer: Layer;
  constructor(layerNumber: number, canvas: Canvas) {
    super(["position", "rectModel"]);
    this.layer = canvas.getLayer(layerNumber);
  }

  updateEntity(entity: RectangleModelObject, dt: number) {
    if (entity.hasChanged) {
      this.calculate(entity);
      entity.hasChanged = false;
    }
    this.layer.fillRect(entity.rectModel.cachedDimensions, entity.rectModel.color);
  }

  private calculate(entity: RectangleModelObject) {
    let pos = entity.position.copy();
    let size = entity.rectModel.size;

    pos.subVec(entity.rectModel.centerShift)
    //prevents GC
    let dims = entity.rectModel.cachedDimensions;
    dims[0] = pos.values[0];
    dims[1] = pos.values[1];
    dims[2] = size.values[0];
    dims[3] = size.values[1];

    Vector.store(pos);
  }
}
