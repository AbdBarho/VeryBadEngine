import MathHelper from "./math";

export default class Vector {
  /**
   * @param {Number[]|Number} values
   */
  constructor(values) {
    if (typeof values === "number")
      values = Array(values).fill(0);
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
    for (let i = 0; i < this.values.length; i++)
      this.values[i] += num;
    return this;
  }
  /**
   * @param {Number} num
   */
  mulNum(num) {
    for (let i = 0; i < this.values.length; i++)
      this.values[i] *= num;
    return this;
  }
  /**
   * @param {Number} num
   */
  divNum(num) {
    if (num === 0)
      throw "Zero division error";
    return this.mulNum(1 / num);
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
   * @param {Vector} vector
   */
  divVec(vector) {
    let len = getMaxLength([this, vector]);
    for (let i = 0; i < len; i++)
      if (vector.get(i) === 0)
        throw "Division by Zero";
      else
        this.values[i] = this.get(i) / vector.get(i);
    return this;
  }
  /**
   * @param {Vector} vector
   */
  mulVec(vector) {
    let len = getMaxLength([this, vector]);
    for (let i = 0; i < len; i++)
      this.values[i] = this.get(i) * vector.get(i);
    return this;
  }


  /**
   * @param {Number} min
   * @param {Number} max
   */
  limitValues(min, max) {
    for (let i = 0; i < this.values.length; i++)
      this.values[i] = MathHelper.limitBetween(this.values[i], min, max);
    return this;
  }

  /**
   * @param {Vector} vec
   */
  limitByMax(vec) {
    for (let i = 0; i < this.values.length; i++) {
      let max = Math.abs(vec.get(i));
      this.values[i] = MathHelper.limitBetween(this.values[i], -max, max);
    }
    return this;
  }

  /**
   * @param {Vector} minVec
   * @param {Vector} maxVec
   */
  limitByMinMax(minVec, maxVec) {
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

  smallerThan(vec) {
    let len = getMaxLength([this, vec]);
    for (let i = 0; i < len; ++i)
      if (this.get(i) >= vec.get(i))
        return false;
    return true;
  }

  /**
   *
   * @param {(val: Number, index: Number, arr: Number[]) => Number} func
   * @param {any} context
   */
  map(func, context) {
    return new Vector(this.values.map((el, i, arr) => func.call(context, el, i, arr)));
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