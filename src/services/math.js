export default class MathHelper {
  static atan2(x, y) {
    // we use -y because the y is positive when we go down the canvas, not up just like in normal math
    return Math.atan2(-y, x);
  }

  static direction(xStart, yStart, xEnd, yEnd) {
    let angle = this.atan2(xEnd - xStart, yEnd - yStart);
    // console.log(angle * 180 / Math.PI);
    return { x: Math.cos(angle), y: -Math.sin(angle) };
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

  static getRandomWithSign() {
    let r = Math.random();
    if (Math.random() < 0.5)
      return r;
    return -r;
  }

  static limitBetween(num, min, max) {
    return Math.max(Math.min(num, max), min);
  }
}