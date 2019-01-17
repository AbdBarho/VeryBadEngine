import IGradient from "./IGradient";
import Layer from "../../../core/Layer";

export type GradientShiftX = "center" | "left" | "right";
export type GradientShiftY = "center" | "top" | "bottom";

export type RotatingGradientConfig = {
  speed: number;
  start: number;
  shiftX: GradientShiftX;
  shiftY: GradientShiftY;
  stops: { [stop: number]: string };
}
export default class RotatingGradient implements IGradient {
  angle: number;
  speed: number;
  stops: number[];
  colors: string[];
  shiftX: GradientShiftX;
  shiftY: GradientShiftY;

  constructor(config: RotatingGradientConfig) {
    this.angle = config.start;
    this.speed = config.speed;
    this.stops = Object.keys(config.stops).map(x => parseFloat(x) / 100);
    this.colors = Object.values(config.stops);
    this.shiftX = config.shiftX;
    this.shiftY = config.shiftY;
  }

  update(dt: number) {
    this.angle = (this.angle + dt * this.speed + 360) % 360;
  }

  getFillStyle(layer: Layer) {
    // let v = getBorderGradient(this.angle, layer.width, layer.height);
    let v = getCircleGradient(this.angle, Math.min(layer.width, layer.height), ...this.getShiftCoords(layer));
    let gradient = layer.createLinGrad(...v);
    this.stops.forEach((x, i) => gradient.addColorStop(x, this.colors[i]));
    return gradient;
  }

  getFillDimensions(layer: Layer): [number, number, number, number] {
    return [0, 0, layer.width, layer.height];
  }

  getShiftCoords(layer: Layer): [number, number] {
    let x = 0, y = 0;
    switch (this.shiftX) {
      case "center": x = layer.width / 2; break;
      case "left": x = 0; break;
      case "right": x = layer.width; break;
    }
    switch (this.shiftY) {
      case "center": y = layer.height / 2; break;
      case "top": y = 0; break;
      case "bottom": y = layer.height; break;
    }
    return [x, y];
  }



}

const FRAME_CENTER_TO_TOP_RIGHT = Math.atan2(9, 16);
const FRAME_ANGLE_DEG = FRAME_CENTER_TO_TOP_RIGHT * 180 / Math.PI;

function getBorderGradient(angle: number, width: number, height: number): [number, number, number, number] {
  angle = (angle + 360) % 360;

  // scale problem down to first quarter of the circle
  let inLowerHalf = angle > 180;
  angle -= inLowerHalf ? 180 : 0;

  let shouldInvertX = angle > 90;
  angle = shouldInvertX ? (180 - angle) : angle;

  let shouldMirror = angle > FRAME_ANGLE_DEG && angle < 180 - FRAME_ANGLE_DEG;
  angle = shouldMirror ? (90 - angle) : angle;

  // calculate
  // convert to radians
  let rad = angle * Math.PI / 180;

  // around the canvas borders
  let l = shouldMirror ? height : width;
  let x = l / 2;
  let y = x * Math.sin(rad) / Math.cos(rad);
  if (shouldMirror)
    [x, y] = [y, x];
  x *= shouldInvertX ? -1 : 1;

  let values = shiftAndMirror(x, y, width / 2, height / 2);
  if (inLowerHalf)
    values = [values[2], values[3], values[0], values[1]];
  return values;
}

function getCircleGradient(angle: number, radius: number, xOff: number, yOff: number): [number, number, number, number] {
  angle = (angle + 360) % 360;
  let rad = angle * Math.PI / 180;
  let l = radius / 2;
  let x = l * Math.cos(rad);
  let y = l * Math.sin(rad);
  return shiftAndMirror(x, y, xOff, yOff);
}

function shiftAndMirror(x: number, y: number, cx: number, cy: number): [number, number, number, number] {
  //shift to center
  y += cy;
  x += cx;

  // mirror over the center to get the end point
  let negX = cx - (x - cx);
  let negY = cy - (y - cy);

  // mirror y values over height/2 because y is positive down not up in canvas
  y = cy - (y - cy);
  negY = cy - (negY - cy);

  return [negX, negY, x, y];
}
