import Frame, { GradientData } from "../../../engine/Frame";
import System from "../../../engine/ecs/system/System";
import { RotatingGradient } from "../../../engine/ecs/components/Component";
import { GradientEntity } from "../types/Entities";

export default class GradientRenderer extends System {
  frame: Frame;
  constructor(frame: Frame) {
    super("GradientRender", ["rotatingGradient"]);
    this.frame = frame;
  }

  updateEntity(entity: GradientEntity, dt: number) {
    const g = entity.rotatingGradient;
    //update
    g.angle = (g.angle + dt * g.speed + 360) % 360;
    //render
    const data = getFillStyle(g);
    this.frame.renderGradientData(data);
  }

}

function getFillStyle(g: RotatingGradient): GradientData {
  return {
    points: getCircleGradient(g.angle, ...getCoords(g)),
    colors: g.colors,
    stops: g.stops
  };
}
function getCoords(g: RotatingGradient): [number, number, number] {
  let x = 0, y = 0, radius = Math[g.radius](g.size.x, g.size.y);
  switch (g.shiftX) {
    case "center": x = g.size.x / 2; break;
    case "left": x = 0; break;
    case "right": x = g.size.x; break;
  }
  switch (g.shiftY) {
    case "center": y = g.size.y / 2; break;
    case "top": y = 0; break;
    case "bottom": y = g.size.y; break;
  }
  return [radius, x, y];
}

const FRAME_CENTER_TO_TOP_RIGHT = Math.atan2(9, 16);
const FRAME_ANGLE_DEG = FRAME_CENTER_TO_TOP_RIGHT * 180 / Math.PI;


function getCircleGradient(angle: number, radius: number, xOff: number, yOff: number):
  [number, number, number, number] {
  angle = (angle + 360) % 360;
  const rad = angle * Math.PI / 180;
  const l = radius / 2;
  const x = l * Math.cos(rad);
  const y = l * Math.sin(rad);

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
