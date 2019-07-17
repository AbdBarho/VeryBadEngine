import IVector from "./IVector";
import { V2 } from "./VectorTypes";

export default class Vec2 implements IVector<Vec2> {
  x: number;
  y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  getType() {
    return "Vec2";
  }

  set(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    return this;
  }

  setArr(values: number[]) {
    return this.set(values[0], values[1]);
  }

  setVec(vector: Vec2) {
    return this.set(vector.x, vector.y);
  }

  fill(val: number) {
    this.x = val;
    this.y = val;
    return this;
  }

  clear() {
    return this.fill(0);
  }

  addNum(num: number) {
    this.x += num;
    this.y += num;
    return this;
  }

  addNums(x: number, y: number) {
    this.x += x;
    this.y += y;
    return this;
  }

  mulNum(num: number) {
    this.x *= num;
    this.y *= num;
    return this;
  }

  divNum(num: number) {
    if (num === 0)
      throw "Division by Zero";
    return this.mulNum(1 / num);
  }

  addVec(vector: Vec2) {
    this.x += vector.x;
    this.y += vector.y;
    return this;
  }

  subVec(vector: Vec2) {
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
  }

  divVec(vector: Vec2) {
    if (vector.x == 0 || vector.y == 0)
      throw "Division by Zero";
    this.x /= vector.x;
    this.y /= vector.y;
    return this;
  }

  mulVec(vector: Vec2) {
    this.x *= vector.x;
    this.y *= vector.y;
    return this;
  }

  trunc() {
    return this.set(Math.trunc(this.x), Math.trunc(this.y));
  }

  abs() {
    return this.set(Math.abs(this.x), Math.abs(this.y));
  }

  smallerThan(vector: Vec2) {
    return this.x < vector.x && this.y < vector.y;
  }

  magnitudeSquared() {
    return this.x * this.x + this.y * this.y;
  }

  limitByMinMaxNum(min: number, max: number) {
    return this.set(Math.min(Math.max(min, this.x), max), Math.min(Math.max(min, this.y), max));
  }

  limitByMinMax(min: Vec2, max: Vec2) {
    return this.set(Math.min(Math.max(min.x, this.x), max.x), Math.min(Math.max(min.y, this.y), max.y));
  }

  limitByMaxNumber(max: number) {
    return this.limitByMinMaxNum(-max, max);
  }

  copyValues() {
    return [this.x, this.y];
  }

  toV2(): V2 {
    return { x: this.x, y: this.y };
  }
}
