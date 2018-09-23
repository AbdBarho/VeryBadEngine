import Vector from "../math/vector";
import BoundingBox, { BoundingBoxParameter} from "./boundingbox";

export interface StaticObjectParameter extends BoundingBoxParameter {
  CENTER_SHIFT: Vector
}

export default class StaticObject extends BoundingBox {
  centerShift: Vector;

  constructor(params: StaticObjectParameter) {
    super(params);
    this.centerShift = params.CENTER_SHIFT;
  }

  getRenderingCommand() {

  };

  destroy() {
    //nothing
  };

}