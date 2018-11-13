import initconfig from "../config/initconfig";
import InputManager from "../core/inputManager";
import { RectangularModel } from "../ecs/component";
import ECS from "../ecs/ecs";
import Entity from "../ecs/entity";
import System from "../ecs/system/system";
import EntityFactory from "../factory/factory";
import MathHelper from "../math/math";
import Vector from "../math/vector";
import Logger from "../services/logger";

interface MouseFollowerEntity extends Entity {
  mouseFollower: boolean;
  acceleration: Vector;
  position: Vector;
  velocity: Vector;
  rectModel: RectangularModel;
}

interface MouseFollowerConfig {
  isFrozen: boolean;
  stopOnReach: boolean;
  destroyOnReach: boolean;
  respawnOnDestroy: boolean;
  lookAheadSteps: number;
  randomFactorScale: number;
  accelerationScale: number;
}

const CONFIG = initconfig.SYSTEMS.MOUSE_FOLLOWER_SYSTEM;
export default class MouseFollowerSystem extends System {
  input: InputManager;
  ecs: ECS;
  config: MouseFollowerConfig = {
    isFrozen: CONFIG.IS_FROZEN,
    stopOnReach: CONFIG.STOP_ON_REACH,
    destroyOnReach: CONFIG.DESTROY_ON_REACH,
    respawnOnDestroy: CONFIG.RESPAWN_ON_DESTROY,
    lookAheadSteps: CONFIG.LOOK_AHEAD_STEPS,
    randomFactorScale: CONFIG.RANDOM_FACTOR_SCALE,
    accelerationScale: CONFIG.ACCELERATION_SCALE
  }
  target = new Vector([1000, 500]);

  constructor(inputManager: InputManager, ecs: ECS) {
    super(["acceleration", "position", "velocity", "mouseFollower"]);
    this.input = inputManager;
    this.ecs = ecs;
    Logger.debugState(Object.assign({}, this.config));
  }

  init() {
    this.input.onMouseMove(this.mouseMove, this);
  }

  mouseMove(mousePos: Vector) {
    this.target = mousePos;
  }

  freeze() {
    this.config.isFrozen = true;
    for (let id in this.entities)
      this.entities[id].isFrozen = true;
  }

  unfreeze() {
    this.config.isFrozen = false;
    for (let id in this.entities)
      this.entities[id].isFrozen = false;
  }

  reverseFreezeState() {
    this.config.isFrozen ? this.unfreeze() : this.freeze();
  }

  update(dt: number) {
    if (this.config.isFrozen)
      return;
    return super.update(dt);
  }

  updateEntity(entity: MouseFollowerEntity, dt: number) {
    if (this.config.destroyOnReach || this.config.stopOnReach) {
      if (this.targetReached(entity)) {
        if (this.config.stopOnReach)
          entity.isFrozen = true;

        if (this.config.destroyOnReach && this.config.respawnOnDestroy) {
          //simulate respawn
          Object.assign(entity, EntityFactory.createMouseFollower(), { ID: entity.ID });
        } else if (this.config.destroyOnReach) {
          this.ecs.removeEntity(entity.ID);
        }
        return;
      }
    }

    let dir;
    let { lookAheadSteps, randomFactorScale, accelerationScale } = this.config;

    if (lookAheadSteps !== 0) {
      let pos = entity.position.copy();
      let vel = entity.velocity.copy();
      pos.addVec(vel.mulNum(lookAheadSteps));
      dir = MathHelper.direction2d(pos, this.target).mulNum(accelerationScale);
      Vector.store(pos, vel);
    } else {
      dir = MathHelper.direction2d(entity.position, this.target).mulNum(accelerationScale);
    }

    if (randomFactorScale !== 0)
      dir.addNum(MathHelper.getSignedRandom() * randomFactorScale * accelerationScale);

    entity.acceleration.setVec(dir);
    entity.isFrozen = false;
    entity.hasChanged = true;

    Vector.store(dir);
  }

  targetReached(entity: MouseFollowerEntity) {
    let target = this.target.copy();
    //calculate distance
    target.subVec(entity.position).abs();
    let reached = target.smallerThan(entity.rectModel.centerShift);
    Vector.store(target);
    return reached;
  }

  destroy() {
    this.input.off("mousemove", this.mouseMove);
  }
}
