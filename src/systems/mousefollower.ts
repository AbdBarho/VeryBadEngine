import System from "../ecs/system/system";
import IEntity from "../ecs/entity";
import Vector from "../math/vector";
import MathHelper from "../math/math";
import InputManager from "../core/inputmanager";
import Logger from "../services/logger";
import { RectangularModel } from "../ecs/component";
import initconfig from "../config/initconfig";
import EntityFactory from "../factory/factory";
import ECS from "../ecs/ecs";

interface MouseFollowerEntity extends IEntity {
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
    this.input.on("mousemove", this.mouseMove, this);
    Logger.debugState(Object.assign({}, this.config));
  }

  mouseMove(mousePos: Vector | string) {
    this.target = mousePos as Vector;
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
      entity.position.cache();
      entity.velocity.cache();
      entity.position.addVec(entity.velocity.mulNum(lookAheadSteps));
      dir = MathHelper.direction2d(entity.position, this.target).mulNum(accelerationScale);
      entity.velocity.uncache();
      entity.position.uncache();
    } else {
      dir = MathHelper.direction2d(entity.position, this.target).mulNum(accelerationScale);
    }

    if (randomFactorScale !== 0)
      dir.addNum(MathHelper.getSignedRandom() * randomFactorScale * accelerationScale);

    entity.acceleration.setVec(dir);
    entity.isFrozen = false;
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
    this.input.off("mousemove", this.mouseMove);
  }
}