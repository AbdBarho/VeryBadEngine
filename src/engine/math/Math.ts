import { V2 } from "./VectorTypes";

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

  static direction2d(vecStart: V2, vecEnd: V2) {
    let angle = this.atan2(vecEnd.x - vecStart.x, vecEnd.y - vecStart.y);
    // we use -y because the y is positive when we go down the canvas, not up just like in normal math
    return { x: Math.cos(angle), y: -Math.sin(angle) };
  }

  static rotation2d(vec: V2) {
    let angle = this.atan2(vec.x, vec.y);
    // we use -y because the y is positive when we go down the canvas, not up just like in normal math
    return { x: Math.cos(angle), y: -Math.sin(angle) };
  }

  static getRandomInt(max: number, min = 0) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  static getRandomColor() {
    let r = this.toHexColor(this.getRandomInt(256));
    let g = this.toHexColor(this.getRandomInt(256));
    let b = this.toHexColor(this.getRandomInt(256));
    return "#" + r + g + b;
  }

  static toHexColor(x: number) {
    return (x < 16 ? "0" : "") + x.toString(16);
  }


  static getSignedRandom(offset = 0, scale = 1) {
    let r = Math.random();
    if (Math.random() < 0.5)
      return offset + r * scale;
    return -offset + (-r * scale);
  }

  static getRandomBool() {
    return Math.random() >= 0.5;
  }

  static limitBetween(num: number, min: number, max: number) {
    return Math.max(Math.min(num, max), min);
  }

  static randomV2Int(v: V2) {
    return {
      x: this.getRandomInt(v.x),
      y: this.getRandomInt(v.y)
    };
  }
}
