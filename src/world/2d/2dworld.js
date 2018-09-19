import World from "../world";
import MathHelper from "../../services/math";

const WIDTH = 1920;
const HEIGHT = 1080;
export default class TwoDimensionalWorld extends World {
  constructor() {
    super();
    this.width = WIDTH;
    this.height = HEIGHT;
    this.x = 0;
    this.y = 0;
  }

  getDimensions() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }

  getRandomPosition() {
    return {
      x: MathHelper.getRandomInt(this.width),
      y: MathHelper.getRandomInt(this.height)
    };
  }
}
