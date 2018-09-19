import MathHelper from "./math";

export default class Vector {
  /**
   * @param {Number[]} values
   */
  constructor(values) {
    this.values = values;
  }

  /**
   * @param {Number} index
   */
  get(index) {
    return this.values[index] || 0;
  }

  /**
   * @returns {Number[]}
   */
  getValues() {
    return this.values.slice(0);
  }
  /**
   * @param {Number} index
   * @param {Number} newVal
   */
  set(index, newVal) {
    this.values[index] = newVal;
  }

  /**
   * @param {Number} num
   */
  addNum(num) {
    this.values.forEach((val, i) => this.values[i] = val + num);
    return this;
  }
  /**
   * @param {Number} num
   */
  mulNum(num) {
    this.values.forEach((val, i) => this.values[i] = val * num);
    return this;
  }

  /**
   * @param {Vector} vector
   */
  addVec(vector) {
    let len = getMaxLength([this, vector]);
    for (let i = 0; i < len; i++)
      this.values[i] = this.get(i) + vector.get(i);
    return this;
  }

  /**
   * @param {Vector} vector
   */
  subVec(vector) {
    let len = getMaxLength([this, vector]);
    for (let i = 0; i < len; i++)
      this.values[i] = this.get(i) - vector.get(i);
    return this;
  }

  /**
   * @param {Number} min
   * @param {Number} max
   */
  limitValues(min, max) {
    this.values.forEach((val, i) => this.values[i] = MathHelper.limitBetween(val, min, max));
    return this;
  }

  /**
   * @param {Vector} vec
   */
  limitByMax(vec) {
    this.values.forEach((val, i) => {
      let max = Math.abs(vec.get(i));
      this.values[i] = MathHelper.limitBetween(val, -max, max);
    });
    return this;
  }

  /**
   * @param {Vector} minVec
   * @param {Vector} maxVec
   */
  limitByMinMax(minVec, maxVec) {
    this.values.forEach((val, i) => this.values[i] = MathHelper.limitBetween(val, minVec.get(i), maxVec.get(i)));
    return this;
  }

  abs() {
    this.values.forEach((val, i) => this.values[i] = Math.abs(val));
    return this;
  }

  neg() {
    this.values.forEach((val, i) => this.values[i] = -val);
    return this;
  }

  smallerThan(vec) {
    let len = getMaxLength([this, vec]);
    for (let i = 0; i < len; ++i)
      if (this.get(i) >= vec.get(i))
        return false;
    return true;
  }

  copy() {
    return new Vector(this.getValues());
  }
}

/**
 * @param  {Vector[]} vectors
 */
function getMaxLength(vectors) {
  return vectors.reduce((acc, vec) => Math.max(acc, vec.values.length), 0);
}
