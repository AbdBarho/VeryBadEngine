import { ExplosionModel, StarAnimation, Flag, Color, RotatingGradient, OpacityAnimation } from "./components/Component";
import { V2 } from "../math/VectorTypes";

export type Component = keyof Entity;

export default interface Entity {
  ID: string;
  //movement
  moves?: boolean;
  position?: V2;
  velocity?: V2;
  isFrozen?: Flag;
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
  opacityAnimation?: OpacityAnimation;
}

export interface VelocityEntity extends Entity {
  position: V2;
  velocity: V2;
}

export interface AccelerationEntity extends Entity {
  acceleration: V2;
  velocity: V2;
}
export interface LimitedVel extends Entity {
  velocity: V2;
  maxVelocity: number;
}

export interface LimitedAcc extends Entity {
  acceleration: V2;
  maxAcceleration: number;
}
export interface RectangleModelObject extends Entity {
  position: V2
  rectModel: Flag
  rectColor: Color
  borderBox: V2
}
