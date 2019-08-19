import { V2 } from "../../math/VectorTypes";

export type Color = string;

export type Flag = boolean;

export type GradientShiftX = "center" | "left" | "right";
export type GradientShiftY = "center" | "top" | "bottom";
export type GradientRadius = "min" | "max";
export type GradientStops = { [stop: number]: Color };

export type ExplosionModel = {
  color: Color
  radius: number
  lifeTime: number
  progress: number
}

export type StarAnimation = {
  progress: number
  lifeTime: number
  numFrames: number
  borderBox: V2
  cache: OffscreenCanvas;
}

export type RotatingGradient = {
  size: V2;
  angle: number;
  speed: number;
  stops: number[];
  colors: Color[];
  shiftX: GradientShiftX;
  shiftY: GradientShiftY;
  radius: GradientRadius;
}

export type OpacityAnimation = {
  start: number
  end: number
  lifeTime: number
  progress: number
}
