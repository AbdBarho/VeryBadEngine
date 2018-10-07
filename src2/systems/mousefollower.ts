import System from "../ecs/system";
import Entity from "../ecs/entity";
import Vector from "../math/vector";
import MathHelper from "../math/math";
import InputManager from "../engine/inputmanager";
import Logger from "../services/logger";
import { RectangularModel } from "../ecs/component";

interface MouseFollowerEntity extends Entity {
  mouseFollower: boolean;
  acceleration: Vector;
  position: Vector;
  velocity: Vector;
  rectModel: RectangularModel;
}

let ACCELERATION_SCALE = 0.0015;
export default class MouseFollowerSystem extends System {
  input: InputManager;
  isFrozen = false;
  stopOnReach = false;
  lookAheadSteps = 0;
  randomFactorScale = 0;
  target = new Vector(2);

  constructor(inputManager: InputManager) {
    super(["acceleration", "position", "velocity", "mouseFollower"]);
    this.input = inputManager;
    this.input.on("keydown", this.handleKey, this);
    this.input.on("mousemove", this.mouseMove, this);
  }

  mouseMove(mousePos: Vector | string) {
    this.target = mousePos as Vector;
  }

  handleKey(keyName: string | Vector) {
    if (keyName === "Digit1")
      this.isFrozen = !this.isFrozen;
    else if (keyName === "Digit2")
      this.setMovementParameters(0, 0, false);
    else if (keyName === "Digit3")
      this.setMovementParameters(0, 1, false);
    else if (keyName === "Digit4")
      this.setMovementParameters(250, 0, true);
  }

  setMovementParameters(lookAhed = 0, randomScale = 0, stopOnReach = false) {
    this.isFrozen = false;
    this.lookAheadSteps = lookAhed;
    this.randomFactorScale = randomScale;
    this.stopOnReach = stopOnReach;
  }

  updateEntity(entity: MouseFollowerEntity, dt: number) {
    entity.isFrozen = this.isFrozen
    if (this.isFrozen)
      return;

    if (this.stopOnReach && this.targetReached(entity)) {
      entity.isFrozen = true;
      return;
    }

    let dir;
    if (this.lookAheadSteps !== 0) {
      entity.position.cache();
      entity.velocity.cache();
      entity.position.addVec(entity.velocity.mulNum(this.lookAheadSteps));
      dir = MathHelper.direction2d(entity.position, this.target).mulNum(ACCELERATION_SCALE);
      entity.velocity.uncache();
      entity.position.uncache();
    } else {
      dir = MathHelper.direction2d(entity.position, this.target).mulNum(ACCELERATION_SCALE);
    }

    if (this.randomFactorScale !== 0)
      dir.addNum(MathHelper.getSignedRandom() * this.randomFactorScale * ACCELERATION_SCALE);

    entity.acceleration.setVec(dir);
    entity.hasChanged = true;
  }

  targetReached(entity: MouseFollowerEntity) {
    this.target.cache();
    //calculate distance
    this.target.subVec(entity.position).abs();
    let reached = this.target.smallerThan(entity.rectModel.centerShift);
    this.target.uncache();
    return reached;
  }

  destroy() {
    this.input.off("keydown", this.handleKey);
    this.input.off("mousemove", this.mouseMove);
  }
}