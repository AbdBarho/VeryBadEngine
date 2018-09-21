import Vector from "../services/math/vector";
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
  WORLD: {
    SIZE: new Vector([1920, 1080]),
  },
  MOVEMENT: {
    MAX_VELOCITY: 500,
    MAX_ACCELERATION: 1000
  },
  MOUSE: new Vector(2),
  OBJECTS: {
    MOUSE_FOLLOWER: {
      NUM_DIMENSIONS: 2,
      POSITION: new Vector(2),
      SIZE: new Vector([20, 20]),
      VELOCITY: new Vector(2),
      ACCELERATION: new Vector(2),
      MAX_VELOCITY: 10,
      MAX_ACCELERATION: 10,
      BEHAVIORS: MouseFollowerBehaviors,
      DEFAULT_BEHAVIOR_INDEX: 1
    },
    ACCURATE_MOUSE_FOLLOWER: {
      POSITION: new Vector(2),
      SIZE: new Vector([20, 20]),
      VELOCITY: new Vector(2),
      ACCELERATION: new Vector(2),
      MAX_VELOCITY: 500,
      MAX_ACCELERATION: 1000,
      ACCELERATION_SCALE: 1500,
      BEHAVIORS: MouseFollowerBehaviors,
      DEFAULT_BEHAVIOR_INDEX: 1
    }
  }
};