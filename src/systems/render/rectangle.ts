import System from "../../ecs/system/system";
import Entity from "../../ecs/entity";
import { RectangularModel } from "../../ecs/component";
import Canvas from "../../core/canvas";
import Vector from "../../math/vector";

interface RectangleModelObject extends Entity {
  position: Vector;
  rectModel: RectangularModel;
}

export default class RectangleRenderer extends System {
  canvas: Canvas;
  constructor(canvas: Canvas) {
    super(["position", "rectModel"]);
    this.canvas = canvas;
  }

  updateEntity(entity: RectangleModelObject, dt: number) {
    if (entity.hasChanged) {
      this.calculate(entity);
      entity.hasChanged = false;
    }
    // this.canvas.ctx.fillStyle = entity.rectModel.color;
    // let dims = entity.rectModel.cachedDimensions;
    // this.canvas.ctx.fillRect(dims[0], dims[1], dims[2], dims[3]);
    this.canvas.fillRect(entity.rectModel.cachedDimensions, entity.rectModel.color);
  }

  private calculate(entity: RectangleModelObject) {
    let pos = entity.position.copy();
    let size = entity.rectModel.size;

    pos.subVec(entity.rectModel.centerShift)
    // pos.mulVec(this.canvas.config.scale);
    // size.mulVec(this.canvas.config.scale);
    //prevents GC
    let dims = entity.rectModel.cachedDimensions;
    dims[0] = pos.values[0];
    dims[1] = pos.values[1];
    dims[2] = size.values[0];
    dims[3] = size.values[1];

    Vector.store(pos);
  }
}
