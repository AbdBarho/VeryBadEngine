import MathHelper from "./math";

type Param = (Vector | number | string | undefined);

interface mapFunction { (val: number, index: number, arr: number[]): number }

export default class Vector {
  values: number[];
  cachedValues: number[] = [];
  constructor(values: number | number[]) {
    if (typeof values === "number")
      values = Array(values).fill(0);
    this.values = values;
  }

  get(index: number) {
    return this.values[index] || 0;
  }

  getValues() {
    return this.values.slice(0);
  }

  getLength() {
    return this.values.length;
  }

  setVec(vector: Vector) {
    this.values = vector.values;
  }

  setArr(arr: number[]) {
    this.values = arr;
  }

  cache() {
    this.cachedValues = this.values.slice(0);
    return this;
  }

  uncache() {
    this.values = this.cachedValues;
    return this;
  }

  addNum(num: number) {
    for (let i = 0; i < this.values.length; i++)
      this.values[i] += num;
    return this;
  }

  mulNum(num: number) {
    for (let i = 0; i < this.values.length; i++)
      this.values[i] *= num;
    return this;
  }

  divNum(num: number) {
    if (num === 0)
      throw "Zero division error";
    return this.mulNum(1 / num);
  }

  addVec(vector: Vector) {
    let len = getMaxLength([this, vector]);
    for (let i = 0; i < len; i++)
      this.values[i] = this.get(i) + vector.get(i);
    return this;
  }

  subVec(vector: Vector) {
    let len = getMaxLength([this, vector]);
    for (let i = 0; i < len; i++)
      this.values[i] = this.get(i) - vector.get(i);
    return this;
  }

  divVec(vector: Vector) {
    let len = getMaxLength([this, vector]);
    for (let i = 0; i < len; i++)
      if (vector.get(i) === 0)
        throw "Division by Zero";
      else
        this.values[i] = this.get(i) / vector.get(i);
    return this;
  }

  mulVec(vector: Vector) {
    let len = getMaxLength([this, vector]);
    for (let i = 0; i < len; i++)
      this.values[i] = this.get(i) * vector.get(i);
    return this;
  }

  limitValues(min: number, max: number) {
    for (let i = 0; i < this.values.length; i++)
      this.values[i] = MathHelper.limitBetween(this.values[i], min, max);
    return this;
  }

  limitByMax(vec: Vector) {
    for (let i = 0; i < this.values.length; i++) {
      let max = Math.abs(vec.get(i));
      this.values[i] = MathHelper.limitBetween(this.values[i], -max, max);
    }
    return this;
  }

  limitByMinMax(minVec: Vector, maxVec: Vector) {
    for (let i = 0; i < this.values.length; i++)
      this.values[i] = MathHelper.limitBetween(this.values[i], minVec.get(i), maxVec.get(i));
    return this;
  }

  abs() {
    for (let i = 0; i < this.values.length; i++)
      this.values[i] = Math.abs(this.values[i]);
    return this;
  }

  neg() {
    for (let i = 0; i < this.values.length; i++)
      this.values[i] = -this.values[i];
    return this;
  }

  floor() {
    for (let i = 0; i < this.values.length; i++)
      this.values[i] = Math.floor(this.values[i]);
    return this;
  }

  smallerThan(vec: Vector) {
    let len = getMaxLength([this, vec]);
    for (let i = 0; i < len; ++i)
      if (this.get(i) >= vec.get(i))
        return false;
    return true;
  }


  map(func: mapFunction, context?: any) {
    return new Vector(this.values.map((el, i, arr) => func.call(context, el, i, arr)));
  }

  copy() {
    return new Vector(this.getValues());
  }
}


function getMaxLength(vectors: Vector[]) {
  return vectors.reduce((acc, vec) => Math.max(acc, vec.getLength()), 0);
}