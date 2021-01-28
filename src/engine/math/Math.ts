import { V2 } from "./VectorTypes";

export const FULL_CIRCLE = Math.PI * 2;

export function speedPerSecond(value: number) {
  return value / 1000;
}

export function accelerationPerSecond(value: number) {
  return value / 1000000;
}

export function degreesPerSec(value: number) {
  return value * Math.PI / 180000;
}

export function atan2(x: number, y: number) {
  // we use -y because the y is positive when we go down the canvas, not up just like in normal math
  return Math.atan2(-y, x);
}

export function direction2d(vecStart: V2, vecEnd: V2) {
  let angle = atan2(vecEnd.x - vecStart.x, vecEnd.y - vecStart.y);
  // we use -y because the y is positive when we go down the canvas, not up just like in normal math
  return { x: Math.cos(angle), y: -Math.sin(angle) };
}

export function rotation2d(vec: V2) {
  let angle = atan2(vec.x, vec.y);
  // we use -y because the y is positive when we go down the canvas, not up just like in normal math
  return { x: Math.cos(angle), y: -Math.sin(angle) };
}
export function getRandomInt(max: number, min = 0) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getRandomColor() {
  let r = toHexColor(getRandomInt(256));
  let g = toHexColor(getRandomInt(256));
  let b = toHexColor(getRandomInt(256));
  return "#" + r + g + b;
}

export function toHexColor(x: number) {
  return (x < 16 ? "0" : "") + x.toString(16);
}


export function getSignedRandom(offset = 0, scale = 1) {
  let r = Math.random();
  if (Math.random() < 0.5)
    return offset + r * scale;
  return -offset + (-r * scale);
}

export function getRandomBool() {
  return Math.random() >= 0.5;
}

export function limitBetween(num: number, min: number, max: number) {
  return Math.max(Math.min(num, max), min);
}

export function randomV2Int(v: V2) {
  return {
    x: getRandomInt(v.x),
    y: getRandomInt(v.y)
  };
}

export function clearV2(v: V2) {
  v.x = 0;
  v.y = 0;
}

export function limitMag(v: V2, scale: number) {
  // smart way
  let magSq = v.x * v.x + v.y * v.y;
  if (magSq > scale * scale) {
    let mag = Math.sqrt(magSq);
    v.x = scale * v.x / mag;
    v.y = scale * v.y / mag;
  }
  //fast way
  // v.x = v.x > scale ? scale : v.x < -scale ? -scale : v.x;
  // v.y = v.y > scale ? scale : v.y < -scale ? -scale : v.y;
}

export function sandwich(val: number, min: number, max: number) {
  return val < min ? min : val > max ? max : val;
}

export function interpolate(start: number, end: number, percent: number) {
  return (1 - percent) * start + percent * end;
}
