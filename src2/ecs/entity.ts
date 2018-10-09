import { RectangularModel } from "./component";
import Vector from "../math/vector";

export type ComponentName = keyof IEntity;

export default interface IEntity {
  ID: string;
  hasChanged: boolean;
  isFrozen: boolean;
  //movement
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
  explodes?: boolean;

}