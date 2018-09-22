import Vector from "../math/vector";
import MouseFollowerBehaviors from "../world/mousefollower/mousefollowerbehaviors";

const MAX_TICKS_PER_SECOND = 60;
export default {
  ENGINE: {
    UPDATE_INTERVAL: 1000 / MAX_TICKS_PER_SECOND
  },
  VIEWPORT: {
    SIZE: new Vector([1920, 1080]),
    ACTUAL_SIZE: new Vector(2),
    SCALE: 1
  },
  MOUSE: new Vector(2),
  WORLD: {
    SIZE: new Vector([1920, 1080]),
    POSITION: new Vector(2)
  },
  MOUSE_FOLLOWER: {
    NUM_DIMENSIONS: 2,
    POSITION: new Vector(2),
    SIZE: new Vector([20, 20]),
    CENTER_SHIFT: new Vector([10, 10]),
    VELOCITY: new Vector(2),
    ACCELERATION: new Vector(2),
    MAX_VELOCITY: 10,
    MAX_ACCELERATION: 10,
    BEHAVIORS: MouseFollowerBehaviors
  },
  ACCURATE_MOUSE_FOLLOWER: {
    POSITION: new Vector(2),
    SIZE: new Vector([20, 20]),
    CENTER_SHIFT: new Vector([10, 10]),
    VELOCITY: new Vector(2),
    ACCELERATION: new Vector(2),
    MAX_VELOCITY: 500,
    MAX_ACCELERATION: 1000,
    ACCELERATION_SCALE: 1500,
    BEHAVIORS: MouseFollowerBehaviors
  }

};