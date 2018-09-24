import Vector from "../math/vector";

export interface BoundingBoxParameter {
  POSITION: Vector,
  SIZE: Vector,
  CENTER_SHIFT: Vector
}

export default class BoundingBox {
  pos: Vector;
  size: Vector;
  centerShift: Vector;
  changed = false;

  constructor(params: BoundingBoxParameter) {
    this.pos = params.POSITION;
    this.size = params.SIZE;
    this.centerShift = params.CENTER_SHIFT;
  }

  setPosition(pos: Vector) {
    this.pos = pos;
  }

  triggerUpdate(dt: number) {
    let changed = false;
    changed = this.beforeUpdate(dt) || changed;
    changed = this.update(dt) || changed;
    changed = this.afterUpdate(dt) || changed;
    this.changed = changed;
    return changed;
  }

  beforeUpdate(dt: number) {
    //nothing yet
    return false;
  }

  update(dt: number) {
    //nothing yet
    return false;
  }

  afterUpdate(dt: number) {
    //nothing yet
    return false;
  }

  hasChanged() {
    return this.changed;
  }

  destroy() {
    //nothing
  };
}