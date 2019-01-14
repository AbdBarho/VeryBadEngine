
export default interface IVector<Vector> {
  getType: () => string;
  set: (...values: number[]) => this;
  setVec: (vector: Vector) => this;
  setArr: (values: number[]) => this;
  fill: (value: number) => this;
  clear: () => this;
  addNum: (num: number) => this;
  mulNum: (num: number) => this;
  divNum: (num: number) => this;
  addVec: (vector: Vector) => this;
  subVec: (vector: Vector) => this;
  divVec: (vector: Vector) => this;
  mulVec: (vector: Vector) => this;
  trunc: () => this;
  abs: () => this;
  smallerThan: (Vector: Vector) => boolean;
  magnitudeSquared: () => number;
  limitByMinMax: (min: Vector, max: Vector) => this;
  limitByMaxNumber: (max: number) => this;
  copyValues: () => number[];
}
