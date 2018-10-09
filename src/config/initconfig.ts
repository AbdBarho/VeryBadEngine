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
    },
    EXPLOSION: {
      VELOCTIY: speedPerSecond(500) * 2, // * 2 to counter v0
      DISTANCE: 1000
    }
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