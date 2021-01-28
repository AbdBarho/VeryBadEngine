const config = {
  LOGGER: {
    VERBOSITY: 0
  },
  CANVAS: {
    WIDTH: 1920,
    HEIGHT: 1080
  }
};

function fitToScreen() {
  config.CANVAS.WIDTH = window.innerWidth;
  config.CANVAS.HEIGHT = window.innerHeight;
}
fitToScreen();
export default config;
