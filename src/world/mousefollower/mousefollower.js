import MovingObject from "../objects/movingobject";
import MathHelper from "../../services/math/math";
import Vector from "../../services/math/vector";
import EventManager from "../../services/eventmanager";
import NumberKeysMapper from "../../engine/numbekeysmapper";
import Config from "../../config/config";

export default class MouseFollower extends MovingObject {
  constructor(params = Config.getConfig("MOUSE_FOLLOWER")) {
    super(params);

    this.distance = new Vector(2);
    this.target = Config.getMousePos();
    this.color = MathHelper.getRandomColor();

    if (params.DEFAULT_BEHAVIOR_INDEX === -1) {
      this.LOOK_AHED_STEPS = Math.random();
      this.RANDOM_FACTOR_SCALE = Math.random();
      this.STOP_ON_REACH = Math.random() > 0;
    }

    EventManager.on("input_mousemove", this.setTarget, this);
    let behaviors = this.getBehaviorNames();
    this.mapper = new NumberKeysMapper((num) => {
      this.activateBehaviorOnly(behaviors[--num]);
    }, [1, 2, 3, 4]);
  }

  setTarget(x, y) {
    this.target = new Vector([x, y]);
  }

  update() {
    this.updateDistance();
    if (this.STOP_ON_REACH && this.targetReached())
      return this.getRenderingCommand();
    //set a
    this.updateDirection();
    // x += v
    this.pos.addVec(this.velocity);
    // v += a
    this.setSpeed(this.velocity.addVec(this.acceleration));
    this.keepInWorld();
  }

  updateDistance() {
    this.distance = this.target.copy().subVec(this.pos).abs();
  }

  targetReached() {
    return this.distance.smallerThan(this.centerShift);
  }

  updateDirection() {
    let step = this.pos.copy().addVec(this.velocity.copy().mulNum(this.LOOK_AHED_STEPS));
    let dir = MathHelper.direction2d(step, this.target);
    let r = MathHelper.getRandomWithSign() * this.RANDOM_FACTOR_SCALE;
    this.setAcceleration(dir.addNum(r));
  }

  setMovementParameters(lookAhed = 0, randomScale = 0, stopOnReach = false) {
    this.LOOK_AHED_STEPS = lookAhed;
    this.RANDOM_FACTOR_SCALE = randomScale;
    this.STOP_ON_REACH = stopOnReach;
  }

  getRenderingCommand() {
    let pos = this.pos.copy().subVec(this.centerShift);
    let renderDims = pos.floor().getValues().concat(this.size.getValues());
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