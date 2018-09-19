import Moving2DObject from "./moving2dobject";
import MathHelper from "../../services/math/math";
import Vector from "../../services/math/vector";
import EventManager from "../../services/eventmanager";


const WIDTH = 20;
const HEIGHT = 20;
const WORLD_WIDTH = 1920;
const WORLD_HEIGHT = 1080;
//cicle
// const LOOK_AHED_STEPS = 0;
// const RANDOM_FACTOR_SCALE = 0;
// const STOP_ON_REACH = false;

//particle effects
const LOOK_AHED_STEPS = 0;
const RANDOM_FACTOR_SCALE = 1;
const STOP_ON_REACH = false;

//perfect follower
// const LOOK_AHED_STEPS = 10;
// const RANDOM_FACTOR_SCALE = 0;
// const STOP_ON_REACH = true;

const SIZE = new Vector([WIDTH, HEIGHT]);
const BOUNDING_BOX_DISTANCE = new Vector([WIDTH / 2, HEIGHT / 2]);
const UPPER_LIMIT = new Vector([WORLD_WIDTH, WORLD_HEIGHT]).subVec(BOUNDING_BOX_DISTANCE);

export default class MouseFollower extends Moving2DObject {
  constructor() {
    super();

    this.target = new Vector([0, 0]);
    this.distance = new Vector([0, 0]);

    this.color = MathHelper.getRandomColor();
    EventManager.on("input_mousemove", (x, y) => {
      this.target = new Vector([x, y]);
    });
  }

  update() {
    this.distance = this.target.copy().subVec(this.pos).abs();
    if (STOP_ON_REACH && this.targetReached())
      return this.getRenderingCommand();
    this.updateDirection();
    this.move();
    this.pos.limitByMinMax(BOUNDING_BOX_DISTANCE, UPPER_LIMIT);
    this.updateSpeed();
    return this.getRenderingCommand();
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

  getRenderingCommand() {
    let pos = this.pos.copy().subVec(BOUNDING_BOX_DISTANCE);
    let renderDims = pos.floor().getValues().concat(SIZE.getValues());
    return {
      command: "fillRect",
      color: this.color,
      dimensions: renderDims
    };
  }
}