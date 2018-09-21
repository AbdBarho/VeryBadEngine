import World from "../world";
import MathHelper from "../../services/math/math";
import Vector from "../../services/math/vector";
import Config from "../../config/config";


const [WIDTH, HEIGHT] = Config.getWorldSize().getValues();
export default class TwoDimensionalWorld extends World {
  constructor() {
    super();
    this.size = new Vector([WIDTH, HEIGHT]);
    this.pos = new Vector(2);
  }

  getRandomPosition() {
    let x = MathHelper.getRandomInt(WIDTH);
    let y = MathHelper.getRandomInt(HEIGHT);
    return new Vector([x, y]);
  }
}
