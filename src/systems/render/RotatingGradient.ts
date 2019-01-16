import Layer from "../../core/Layer";
import EmptySystem from "../../ecs/system/EmptySystem";
import Update from "../../ecs/system/Update";

type Direction = "to bottom";
type Color = string;
export type GradientConfig = {
  speed: number;
  start: number;
  stops: { [stop: number]: Color }
}
export default class RotatingLinearGradient extends EmptySystem {
  config: GradientConfig;
  layer: Layer;
  angle: number;
  speed: number;
  stops: number[];
  colors: string[];

  constructor(layer: Layer, config: GradientConfig) {
    super("Gradient", Update.every);
    this.layer = layer;
    this.config = config;
    this.angle = config.start;
    this.speed = config.speed;
    this.stops = Object.keys(config.stops).map(x => parseFloat(x) / 100);
    this.colors = Object.values(config.stops);
  }


  update(dt: number) {
    this.angle = (this.angle + dt * this.speed + 360) % 360;
    let v = getGradientParameters(this.angle, this.layer.width, this.layer.height);
    let gradient = this.layer.createLinGrad(v[0], v[1], v[2], v[3]);
    this.stops.forEach((x, i) => gradient.addColorStop(x, this.colors[i]));
    this.layer.ctx.fillStyle = gradient;
    this.layer.fill();
  }
}


const FRAME_CENTER_TO_TOP_RIGHT = Math.atan2(9, 16);
const FRAME_ANGLE_DEG = FRAME_CENTER_TO_TOP_RIGHT * 180 / Math.PI;


function getGradientParameters(angle: number, width: number, height: number) {
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
  let l = shouldMirror ? height : width;
  // let l = Math.min(width, height);
  let x = l / 2;
  let y = x * Math.sin(rad) / Math.cos(rad);

  // undo what has been done at the beginning
  if (shouldMirror) {
    let temp = x;
    x = y;
    y = temp;
  }

  x *= shouldInvertX ? -1 : 1;

  //shift to center
  let halfW = width / 2;
  let halfH = height / 2;
  y += halfH;
  x += halfW;

  // mirror over w/2, h/2
  let negX = halfW - (x - halfW);
  let negY = halfH - (y - halfH);

  // mirror over y = height /2 because y is positive down not up
  y = halfH - (y - halfH);
  negY = halfH - (negY - halfH);

  if (inLowerHalf)
    return [x, y, negX, negY];
  else
    return [negX, negY, x, y];
}
