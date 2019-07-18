import { V2 } from "../../math/vector/VectorTypes";

export type Color = string;

export type Flag = boolean;


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
