const speedPerSecond = (val: number) => val / 1000;
const accelerationPerSecond = (val: number) => val / (1000 ** 2);

export default {
  LOGGER: {
    VERBOSITY: 0
  },
  CANVAS: {
    WIDTH: 1920,
    HEIGHT: 1080
  },
  WORLD: {
    SIZE: [1920, 1080]
  },
  SYSTEMS: {
    MOUSE_FOLLOWER_SYSTEM: {
      IS_FROZEN: false,
      STOP_ON_REACH: false,
      DESTROY_ON_REACH: false,
      RESPAWN_ON_DESTROY: true,
      LOOK_AHEAD_STEPS: 0,
      RANDOM_FACTOR_SCALE: 0,
      ACCELERATION_SCALE: accelerationPerSecond(1500)
    }
  }
};
