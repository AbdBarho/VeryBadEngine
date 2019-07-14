const speedPerSecond = (val: number) => val / 1000;
const accelerationPerSecond = (val: number) => val / (1000000);

let config = {
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
  },
};

function fitToScreen() {
  config.CANVAS.WIDTH = window.innerWidth;
  config.CANVAS.HEIGHT = window.innerHeight;
  config.WORLD.SIZE = [window.innerWidth, window.innerHeight];
}
// fitToScreen();
export default config;
