import Vector from "../math/vector";

export type RectangularModel = {
  size: Vector;
  centerShift: Vector;
  color: string;
  cachedDimensions: number[];
}