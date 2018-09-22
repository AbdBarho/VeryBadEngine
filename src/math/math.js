import Vector from "./vector";

export default class MathHelper {
  static atan2(x, y) {
    // we use -y because the y is positive when we go down the canvas, not up just like in normal math
    return Math.atan2(-y, x);
  }

  /**
   * @param {Vector} vecStart
   * @param {Vector} vecEnd
   */
  static direction2d(vecStart, vecEnd) {
    let angle = this.atan2(vecEnd.get(0) - vecStart.get(0), vecEnd.get(1) - vecStart.get(1));
    // console.log(angle * 180 / Math.PI);
    return new Vector([Math.cos(angle), -Math.sin(angle)]);
  }

  static getRandomInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  static getRandomColor() {
    let r = this.getRandomInt(256);
    let g = this.getRandomInt(256);
    let b = this.getRandomInt(256);
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  static getSignedRandom() {
    let r = Math.random();
    if (Math.random() < 0.5)
      return r;
    return -r;
  }

  static limitBetween(num, min, max) {
    return Math.max(Math.min(num, max), min);
  }
}