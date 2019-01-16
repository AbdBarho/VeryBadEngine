import Vec2 from "../math/vector/Vec2";

export type RectangularModel = {
  size: Vec2;
  centerShift: Vec2;
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
  cachedDrawing: HTMLCanvasElement;
}
