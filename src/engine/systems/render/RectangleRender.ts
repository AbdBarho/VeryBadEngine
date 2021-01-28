import Frame from "../../Frame";
import { RectangleModelObject } from "../../ecs/Entity";
import System from "../../ecs/system/System";


export default class RectangleRenderer extends System {
  frame: Frame;
  constructor(frame: Frame) {
    super("RectangleRender", ["position", "rectModel", "rectColor", "borderBox"]);
    this.frame = frame;
  }

  updateEntity(entity: RectangleModelObject, dt: number) {
    const pos = entity.position;
    const box = entity.borderBox;
    this.frame.fillRect(pos.x - (box.x / 2), pos.y - (box.y / 2), box.x, box.y, entity.rectColor);
  }
}
