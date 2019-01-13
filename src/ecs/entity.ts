import Vector from "../math/Vector";
import { ExplosionModel, RectangularModel, StarAnimation } from "./Component";

export type ComponentName = keyof Entity;

export default interface Entity {
  ID: string;
  hasChanged: boolean;
  //movement
  moves?: boolean;
  position?: Vector;
  velocity?: Vector;
  maxVelocity?: number;
  acceleration?: Vector;
  maxAcceleration?: number;
  // world ends
  keepInWorld?: boolean;
  wrapAroundWorld?: boolean;
  //render
  rectModel?: RectangularModel;
  //mouse follower
  mouseFollower?: boolean;
  //explosion
  explosion?: boolean;
  explosionVelocity?: number;
  maxExplosionDistance?: number;
  explosionModel?: ExplosionModel;
  explodes?: boolean;
  // stars
  starAnimation?: StarAnimation;
  //debug
  debugCirclePoint?: number[];

}
