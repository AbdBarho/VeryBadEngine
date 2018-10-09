import System from "../../ecs/system/system";
import IEntity from "../../ecs/entity";
import { RectangularModel } from "../../ecs/component";
import UI from "../../core/canvas";
import Vector from "../../math/vector";

interface RectangleModelObject extends IEntity {
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
    entity.position.cache();
    entity.rectModel.size.cache();
    entity.position.subVec(entity.rectModel.centerShift)
    entity.position.mulVec(this.ui.config.scale);
    entity.rectModel.size.mulVec(this.ui.config.scale);
    //prevents GC
    entity.rectModel.cachedDimensions[0] = entity.position.get(0);
    entity.rectModel.cachedDimensions[1] = entity.position.get(1);
    entity.rectModel.cachedDimensions[2] = entity.rectModel.size.get(0);
    entity.rectModel.cachedDimensions[3] = entity.rectModel.size.get(1);

    entity.position.uncache();
    entity.rectModel.size.uncache();
  }
}