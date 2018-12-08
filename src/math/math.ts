import Vector from "./vector";

export default class MathHelper {
  static speedPerSecond(value: number) {
    return value / 1000;
  }
  static accelerationPerSecond(value: number) {
    return value / 1000000;
  }

  static degreesPerSec(value: number) {
    return value * Math.PI / 180000;
  }
  static atan2(x: number, y: number) {
    // we use -y because the y is positive when we go down the canvas, not up just like in normal math
    return Math.atan2(-y, x);
  }

  static direction2d(vecStart: Vector, vecEnd: Vector) {
    let angle = this.atan2(vecEnd.get(0) - vecStart.get(0), vecEnd.get(1) - vecStart.get(1));
    // we use -y because the y is positive when we go down the canvas, not up just like in normal math
    return Vector.create([Math.cos(angle), -Math.sin(angle)]);
  }

  static rotation2d(vec: Vector) {
    let angle = this.atan2(vec.get(0), vec.get(1));
    // we use -y because the y is positive when we go down the canvas, not up just like in normal math
    return Vector.create([Math.cos(angle), -Math.sin(angle)]);
  }

  static getRandomInt(max: number, min = 0) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  static getRandomColor() {
    let r = this.getRandomInt(256);
    let g = this.getRandomInt(256);
    let b = this.getRandomInt(256);
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  static getRandomColorWithAlpha() {
    let r = this.getRandomInt(256);
    let g = this.getRandomInt(256);
    let b = this.getRandomInt(256);
    let a = Math.random();
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  }

  static getSignedRandom() {
    let r = Math.random();
    if (Math.random() < 0.5)
      return r;
    return -r;
  }

  static limitBetween(num: number, min: number, max: number) {
    return Math.max(Math.min(num, max), min);
  }

  static getRandomVector(maxValues: number[]) {
    let values = []
    for (let i = 0; i < maxValues.length; i++)
      values.push(this.getRandomInt(maxValues[i]));
    return Vector.create(values);
  }
}
