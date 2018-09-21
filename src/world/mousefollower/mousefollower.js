import MovingObject from "../objects/movingobject";
import MathHelper from "../../services/math/math";
import Vector from "../../services/math/vector";
import EventManager from "../../services/eventmanager";
import NumberKeysMapper from "../../engine/numbekeysmapper";
import GameState from "../../config/gamestate";

//config
const CONFIG = GameState.getConfig("MOUSE_FOLLOWER");
const SIZE = CONFIG.SIZE.copy();
const BOUNDING_BOX_DISTANCE = SIZE.copy().divNum(2);
const WORLD_EDGES = GameState.getWorldSize().subVec(BOUNDING_BOX_DISTANCE);

export default class MouseFollower extends MovingObject {
  constructor() {
    super(2);
    this.distance = new Vector(2);
    this.target = GameState.getMousePos();
    this.color = MathHelper.getRandomColor();

    this.LOOK_AHED_STEPS = 0;
    this.RANDOM_FACTOR_SCALE = 0;
    this.STOP_ON_REACH = false;

    let behaviors = this.initBehaviors(CONFIG);
    this.mapper = new NumberKeysMapper((_, i) => this.activateBehaviorOnly(behaviors[i].name), [1, 2, 3, 4]);
    EventManager.on("input_mousemove", this.setTarget, this);
  }

  setTarget(x, y) {
    this.target = new Vector([x, y]);
  }

  update() {
    this.distance = this.target.copy().subVec(this.pos).abs();
    if (this.STOP_ON_REACH && this.targetReached())
      return this.getRenderingCommand();
    this.updateDirection();
    this.move();
    this.pos.limitByMinMax(BOUNDING_BOX_DISTANCE, WORLD_EDGES);
    this.updateSpeed();
    return this.getRenderingCommand();
  }

  updateDirection() {
    let step = this.pos.copy().addVec(this.velocity.copy().mulNum(this.LOOK_AHED_STEPS));
    let dir = MathHelper.direction2d(step, this.target);
    let r = MathHelper.getRandomWithSign() * this.RANDOM_FACTOR_SCALE;
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

  destroy() {
    this.mapper.destroy();
    EventManager.off("input_mousemove", this.setTarget);
  }
}