import MathHelper from "../../math/math";
import Vector from "../../math/vector";
import EventManager from "../../services/eventmanager";
import NumberKeysMapper from "../../engine/numbekeysmapper";
import Config from "../../config/config";
import MovingObject, { MovingObjectParameter } from "../objects/movingobject";
import FillRect from "../../ui/rendercommands/fillrect";

export interface MouseFollowerParameter extends MovingObjectParameter { };

export default class MouseFollower extends MovingObject {
  target: Vector;
  distance = new Vector(2);
  color: string;
  mapper: NumberKeysMapper;
  lookAhedSteps = 0;
  randomFactorScale = 0;
  stopOnReach = false;

  constructor(params = Config.getConfig("MOUSE_FOLLOWER")) {
    super(params);
    this.target = Config.getMousePos();
    this.color = MathHelper.getRandomColor();

    let behaviors = this.getBehaviorNames();
    this.mapper = new NumberKeysMapper((_, i: number) => {
      this.activateBehaviorOnly(behaviors[i]);
    }, [1, 2, 3, 4]);

    EventManager.on("input_mousemove", this.setTarget, this);
  }

  setTarget(pos: Vector) {
    this.target = pos.copy();
  }

  update(dt: number) {
    this.updateDistance();
    if (this.stopOnReach && this.targetReached())
      return false;
    //set a
    this.updateDirection();
    // x += v
    this.pos.addVec(this.velocity);
    // v += a
    this.setSpeed(this.velocity.addVec(this.acceleration));
    this.keepInWorld();
    return true;
  }

  updateDistance() {
    this.distance = this.target.copy().subVec(this.pos).abs();
  }

  targetReached() {
    return this.distance.smallerThan(this.centerShift);
  }

  updateDirection() {
    let step = this.pos.copy().addVec(this.velocity.copy().mulNum(this.lookAhedSteps));
    let dir = MathHelper.direction2d(step, this.target);
    let r = MathHelper.getSignedRandom() * this.randomFactorScale;
    this.setAcceleration(dir.addNum(r));
  }

  setMovementParameters(lookAhed = 0, randomScale = 0, stopOnReach = false) {
    this.lookAhedSteps = lookAhed;
    this.randomFactorScale = randomScale;
    this.stopOnReach = stopOnReach;
  }

  getRenderingCommand() {
    return new FillRect({
      size: this.size.copy(),
      position: this.pos.copy().subVec(this.centerShift),
      color: this.color,
    });
  }

  destroy() {
    this.mapper.destroy();
    EventManager.off("input_mousemove", this.setTarget);
  }
}