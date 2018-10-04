import Vector from "../math/vector";


const TIME_SCALE = 1000;
const speedPerSecond = (val: number) => val * (TIME_SCALE / 1000);
const accelerationPerSecond = (val: number) => val * ((TIME_SCALE / 1000) ** 2);

export default {
  CANVAS: {
    BASE_SIZE: new Vector([1920, 1080]),
    ASPECT_RATIO: 16 / 9,
  },
  WORLD: {
    SIZE: new Vector([1920, 1080])
  },
  MOUSE_FOLLOWER: {
    NUM_DIMENSIONS: 2,
    POSITION: new Vector(2),
    SIZE: new Vector([20, 20]),
    CENTER_SHIFT: new Vector([10, 10]),
    VELOCITY: new Vector(2),
    ACCELERATION: new Vector(2),
    MAX_VELOCITY: 10,
    MAX_ACCELERATION: 10
  },
  ACCURATE_MOUSE_FOLLOWER: {
    POSITION: new Vector(2),
    SIZE: new Vector([20, 20]),
    CENTER_SHIFT: new Vector([10, 10]),
    VELOCITY: new Vector(2),
    ACCELERATION: new Vector(2),
    MAX_VELOCITY: speedPerSecond(500),
    MAX_ACCELERATION: accelerationPerSecond(1000),
    ACCELERATION_SCALE: accelerationPerSecond(1500)
  }
};