const speedPerSecond = (val: number) => val / 1000;
const accelerationPerSecond = (val: number) => val / (1000 ** 2);

export default {
  LOGGER: {
    VERBOSITY: 0
  },
  CANVAS: {
    BASE_SIZE: [1920, 1080],
    ASPECT_RATIO: 16 / 9,
  },
  WORLD: {
    SIZE: [1920, 1080]
  },
  ENTITIES: {
    MOUSE_FOLLOWER: {
      MAX_ACCELERATION: accelerationPerSecond(1000),
      MAX_VELOCITY: speedPerSecond(500)
    }
  }
};