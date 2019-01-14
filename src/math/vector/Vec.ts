import IVector from "./IVector";
import MathHelper from "../Math";

export default class Vec implements IVector<Vec> {

  // actual Vector class
  values: number[];
  private constructor(values: number[]) {
    this.values = values;
  }

  getType() {
    return "Vec";
  }

  get(index: number) {
    return this.values[index] || 0;
  }

  getValues() {
    return this.values;
  }

  assignValues(values: number[]) {
    this.values = values;
    return this;
  }

  copyValues() {
    return this.values.slice(0);
  }

  getLength() {
    return this.values.length;
  }

  set(...values: number[]) {
    return this.setArr(values);
  }

  setVec(vector: Vec) {
    return this.setArr(vector.values);
  }

  setArr(arr: number[]) {
    for (let i = 0; i < this.values.length; i++)
      this.values[i] = arr[i];
    return this;
  }

  clear() {
    for (let i = 0; i < this.values.length; i++)
      this.values[i] = 0;
    return this;
  }

  fill(value: number) {
    for (let i = 0; i < this.values.length; i++)
      this.values[i] = value;
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

  addVec(vector: Vec) {
    let len = Math.max(this.values.length, vector.values.length);
    for (let i = 0; i < len; i++)
      this.values[i] = this.get(i) + vector.get(i);
    return this;
  }

  subVec(vector: Vec) {
    let len = Math.max(this.values.length, vector.values.length);
    for (let i = 0; i < len; i++)
      this.values[i] = this.get(i) - vector.get(i);
    return this;
  }

  divVec(vector: Vec) {
    let len = Math.max(this.values.length, vector.values.length);
    for (let i = 0; i < len; i++)
      if (vector.get(i) === 0)
        throw "Division by Zero";
      else
        this.values[i] = this.get(i) / vector.get(i);
    return this;
  }

  mulVec(vector: Vec) {
    let len = Math.max(this.values.length, vector.values.length);
    for (let i = 0; i < len; i++)
      this.values[i] = this.get(i) * vector.get(i);
    return this;
  }

  limitByMaxNumber(num: number) {
    for (let i = 0, len = this.values.length; i < len; i++)
      this.values[i] = MathHelper.limitBetween(this.values[i], -num, num);
    return this;
  }

  limitByMinMax(minVec: Vec, maxVec: Vec) {
    for (let i = 0; i < this.values.length; i++)
      this.values[i] = MathHelper.limitBetween(this.values[i], minVec.get(i), maxVec.get(i));
    return this;
  }

  abs() {
    for (let i = 0; i < this.values.length; i++)
      this.values[i] = Math.abs(this.values[i]);
    return this;
  }

  trunc() {
    for (let i = 0; i < this.values.length; i++)
      this.values[i] = Math.trunc(this.values[i]);
    return this;
  }

  smallerThan(vector: Vec) {
    let len = Math.max(this.values.length, vector.values.length);
    for (let i = 0; i < len; ++i)
      if (this.get(i) >= vector.get(i))
        return false;
    return true;
  }

  magnitudeSquared() {
    let sum = 0;
    for (let i = 0; i < this.values.length; i++)
      sum += this.values[i] * this.values[i];
    return sum;
  }

  magnitude() {
    return Math.sqrt(this.magnitudeSquared());
  }
}
