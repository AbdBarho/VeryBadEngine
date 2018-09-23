import Vector from "../math/vector";

export interface BoundingBoxParameter {
  POSITION: Vector,
  SIZE: Vector
}

export default class BoundingBox {
  pos: Vector;
  size: Vector;
  constructor(params: BoundingBoxParameter) {
    this.pos = params.POSITION;
    this.size = params.SIZE;
  }

  setPosition(pos: Vector) {
    this.pos = pos;
  }

  setSize(size: Vector) {
    this.size = size;
  }
}