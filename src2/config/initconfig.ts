import Vector from "../math/vector";


const TIME_SCALE = 1000;
const speedPerSecond = (val: number) => val * (TIME_SCALE / 1000);
const accelerationPerSecond = (val: number) => val * ((TIME_SCALE / 1000) ** 2);

export default {
  LOGGER: {
    VERBOSITY: 0
  },
  CANVAS: {
    BASE_SIZE: new Vector([1920, 1080]),
    ASPECT_RATIO: 16 / 9,
  },
  WORLD: {
    SIZE: new Vector([1920, 1080])
  }
};