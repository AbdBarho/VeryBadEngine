import Vector from "../math/Vector";

export type RectangularModel = {
  size: Vector;
  centerShift: Vector;
  color: string;
  cachedDimensions: number[];
}

export type ExplosionModel = {
  color: string;
  radius: number;
  lifeTime: number;
  progress: number;
}

export type StarAnimation = {
  progress: number,
  lifeTime: number,
  numSpikes: number,
  minRadius: number,
  maxRadius: number,
  rotationSpeed: number,
  color: string,
  cachedDrawing?: HTMLCanvasElement;
}
