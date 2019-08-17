import { V2 } from "../../../engine/math/VectorTypes";
import { RotatingGradient, Flag, StarAnimation, ExplosionModel } from "../../../engine/ecs/components/Component";
import Entity, { RectangleModelObject } from "../../../engine/ecs/Entity";

export interface ExplosionEntity extends Entity {
  position: V2;
  explosion: boolean;
  explosionVelocity: number;
  explosionRadius: number;
}

export interface ExplodableEntity extends Entity {
  explodes: boolean;
  velocity: V2;
  position: V2;
}


export interface GradientEntity extends Entity {
  rotatingGradient: RotatingGradient;
}

export interface KeepInWorldRectangle extends Entity {
  position: V2;
  borderBox: V2;
  keepInWorld: Flag;
}

export interface WrappedEntity extends Entity {
  position: V2;
  wrapAroundWorld: Flag;
}

export interface StarAnimationEntity extends Entity {
  position: V2;
  starAnimation: StarAnimation;
}

export interface MouseFollowerEntity extends RectangleModelObject {
  mouseFollower: Flag
  acceleration: V2
  position: V2
  velocity: V2
  borderBox: V2
}


export interface Explosion extends Entity {
  position: V2;
  explosion: boolean;
  explosionModel: ExplosionModel;
}
