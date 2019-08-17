import { ExplosionModel, StarAnimation, Flag, Color, RotatingGradient } from "./components/Component";
import { V2 } from "../math/VectorTypes";

export type ComponentName = keyof Entity;

export default interface Entity {
  ID: string;
  hasChanged: boolean;
  //movement
  moves?: boolean;
  position?: V2;
  velocity?: V2;
  maxVelocity?: number;
  acceleration?: V2;
  maxAcceleration?: number;
  // world ends
  keepInWorld?: Flag;
  wrapAroundWorld?: Flag;
  //render
  //mouse follower
  mouseFollower?: Flag;
  rectModel?: Flag
  borderBox?: V2
  rectColor?: Color
  //explosion
  explosion?: Flag;
  explosionVelocity?: number;
  explosionRadius?: number;
  explosionModel?: ExplosionModel;
  explodes?: Flag;
  // stars
  starAnimation?: StarAnimation;
  // gradient
  rotatingGradient?: RotatingGradient;

}
