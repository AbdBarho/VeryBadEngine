import Vector from "../math/vector";

export type RectangularModel = {
  size: Vector;
  centerShift: Vector;
  color: string;
  cachedDimensions: number[];
}

export type ExplosionModel = {
  color: string;
  radius: Vector;
  lifeTime: number;
  progress: number;
}