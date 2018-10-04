import { RectangularModel } from "./component";
import Vector from "../math/vector";

export type ComponentName = keyof IEntity;

export interface IEntity {
  position?: Vector;
  velocity?: Vector;
  maxVelocity?: number;
  acceleration?: Vector;
  maxAcceleration?: number;
  rectModel?: RectangularModel;
  mouseFollower?: boolean;
}

export default interface Entity extends IEntity {
  ID: string;
  hasChanged: boolean;
  isFrozen : boolean;
}