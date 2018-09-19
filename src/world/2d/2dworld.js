import World from "../world";
import MathHelper from "../../services/math/math";
import Vector from "../../services/math/vector";

const WIDTH = 1920;
const HEIGHT = 1080;
export default class TwoDimensionalWorld extends World {
  constructor() {
    super();
    this.size = new Vector([WIDTH, HEIGHT]);
    this.pos = new Vector([0, 0]);
  }

  getSize() {
    return this.size.copy();
  }

  getRandomPosition() {
    let dims = [MathHelper.getRandomInt(WIDTH), MathHelper.getRandomInt(HEIGHT)];
    return new Vector(dims);
  }
}
