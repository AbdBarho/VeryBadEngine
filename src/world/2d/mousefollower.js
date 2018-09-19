import Container from "../../services/container";
import Moving2DObject from "./moving2dobject";
import MathHelper from "../../services/math/math";
import Vector from "../../services/math/vector";
import Logger from "../../services/logger";


const WIDTH = 20;
const HEIGHT = 20;
//cicle
// const LOOK_AHED_STEPS = 0;
// const RANDOM_FACTOR_SCALE = 0;
// const STOP_ON_REACH = false;

//particle effects
// const LOOK_AHED_STEPS = 0;
// const RANDOM_FACTOR_SCALE = 1;
// const STOP_ON_REACH = false;

//perfect follower
const LOOK_AHED_STEPS = 10;
const RANDOM_FACTOR_SCALE = 0;
const STOP_ON_REACH = true;

const SIZE = new Vector([WIDTH, HEIGHT]);
const BOUNDING_BOX_DISTANCE = new Vector([WIDTH / 2, HEIGHT / 2]);
let UPPER_LIMIT;
export default class MouseFollower extends Moving2DObject {
  constructor() {
    super();

    this.target = new Vector([0, 0]);
    this.distance = new Vector([0, 0]);

    this.color = MathHelper.getRandomColor();
    if (!UPPER_LIMIT) {
      let worldDims = Container.getWorld().getSize();
      UPPER_LIMIT = worldDims.subVec(BOUNDING_BOX_DISTANCE);
    }

    Container.getInputManager().on("mousemove", (x, y) => this.target = new Vector([x, y]));
  }

  update() {
    this.distance = this.target.copy().subVec(this.pos).abs();
    if (STOP_ON_REACH && this.targetReached())
      return;
    this.updateDirection();
    this.move();
    this.pos.limitByMinMax(BOUNDING_BOX_DISTANCE, UPPER_LIMIT);
    this.updateSpeed();
  }


  updateDirection() {
    let step = this.pos.copy().addVec(this.velocity.copy().mulNum(LOOK_AHED_STEPS));
    let dir = MathHelper.direction2d(step, this.target);
    let r = MathHelper.getRandomWithSign() * RANDOM_FACTOR_SCALE;
    this.setAcceleration(dir.addNum(r));
  }

  targetReached() {
    return this.distance.smallerThan(BOUNDING_BOX_DISTANCE);
  }


  render() {
    let pos = this.pos.copy().subVec(BOUNDING_BOX_DISTANCE);
    this.viewport.fillRect(pos, SIZE, this.color);
  }

}