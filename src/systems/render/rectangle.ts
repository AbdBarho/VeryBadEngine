import System from "../../ecs/system/system";
import Entity from "../../ecs/entity";
import { RectangularModel } from "../../ecs/component";
import UI from "../../core/canvas";
import Vector from "../../math/vector";

interface RectangleModelObject extends Entity {
  position: Vector;
  rectModel: RectangularModel;
}

export default class RectangleRenderer extends System {
  ui: UI;
  constructor(ui: UI) {
    super(["position", "rectModel"]);
    this.ui = ui;
  }

  updateEntity(entity: RectangleModelObject, dt: number) {
    if (entity.hasChanged) {
      this.calculate(entity);
      entity.hasChanged = false;
    }
    this.ui.ctx.fillStyle = entity.rectModel.color;
    let dims = entity.rectModel.cachedDimensions;
    this.ui.ctx.fillRect(dims[0], dims[1], dims[2], dims[3]);
  }

  private calculate(entity: RectangleModelObject) {
    let pos = entity.position.copy();
    let size = entity.rectModel.size.copy();

    pos.subVec(entity.rectModel.centerShift)
    pos.mulVec(this.ui.config.scale);
    size.mulVec(this.ui.config.scale);
    //prevents GC
    let dims = entity.rectModel.cachedDimensions;
    dims[0] = pos.get(0);
    dims[1] = pos.get(1);
    dims[2] = size.get(0);
    dims[3] = size.get(1);

    Vector.store(pos, size);
  }
}
