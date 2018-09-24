import Vector from "../math/vector";
import MouseFollowerBehaviors from "../objects/mousefollower/mousefollowerbehaviors";

const TIME_SCALE = 1000;
const MAX_TICKS_PER_SECOND = 60;
const speedPerSecond = (val: number) => val * (TIME_SCALE / 1000);
const accelerationPerSecond = (val: number) => val * ((TIME_SCALE / 1000) ** 2);

let state: any = {
  LOGGER: {
    VERBOSITY: 2
  },
  ENGINE: {
    TIME_SCALE,
    UPDATE_INTERVAL: 1000 / MAX_TICKS_PER_SECOND
  },
  CANVAS: {
    SCALE: new Vector(2),
    SHIFT: new Vector(2),
    SIZE: new Vector(2),
    BASE_SIZE: new Vector([1920, 1080]),
    ASPECT_RATIO: 16 / 9,
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
    MAX_VELOCITY: speedPerSecond(500),
    MAX_ACCELERATION: accelerationPerSecond(1000),
    ACCELERATION_SCALE: accelerationPerSecond(1500),
    BEHAVIORS: MouseFollowerBehaviors
  }
};

export default state;