import Config from "../../config/config";
import InputManager from "../../core/inputManager";
import { RectangularModel } from "../../ecs/component";
import ECS from "../../ecs/ecs";
import Entity from "../../ecs/entity";
import System from "../../ecs/system/system";
import MathHelper from "../../math/math";
import Vector from "../../math/vector";
import EntityFactory from "./factory";

interface MouseFollowerEntity extends Entity {
  mouseFollower: boolean;
  acceleration: Vector;
  position: Vector;
  velocity: Vector;
  rectModel: RectangularModel;
}

const CONFIG = Config.SYSTEMS.MOUSE_FOLLOWER_SYSTEM;
export default class MouseFollowerSystem extends System {
  input: InputManager;
  ecs: ECS;
  isFrozen = CONFIG.IS_FROZEN;
  stopOnReach = CONFIG.STOP_ON_REACH;
  destroyOnReach = CONFIG.DESTROY_ON_REACH;
  respawnOnDestroy = CONFIG.RESPAWN_ON_DESTROY;
  lookAheadSteps = CONFIG.LOOK_AHEAD_STEPS;
  randomFactorScale = CONFIG.RANDOM_FACTOR_SCALE;
  accelerationScale = CONFIG.ACCELERATION_SCALE;
  target = Vector.create([1000, 500]);


  constructor(inputManager: InputManager, ecs: ECS) {
    super(["acceleration", "position", "velocity", "mouseFollower"]);
    this.input = inputManager;
    this.ecs = ecs;
    this.updateSubRoutines();
  }

  init() {
    this.input.onMouseMove(this.mouseMove, this);
  }

  mouseMove(mousePos: Vector) {
    this.target = mousePos;
  }

  changeFreezeState() {
    this.isFrozen = !this.isFrozen;
  }

  updateSubRoutines() {
    this.getDirection = this.lookAheadSteps ? this.getDirectionWithLookAhead : this.getDirectionNoLookAhead;
    this.scaleIfNeeded = this.randomFactorScale ? this.scaleByRandom : () => { };
  }

  update(dt: number) {
    if (this.isFrozen)
      return;
    return super.update(dt);
  }

  updateEntity(entity: MouseFollowerEntity, dt: number) {
    if (this.destroyOnReach || this.stopOnReach) {
      if (this.targetReached(entity)) {
        if (this.stopOnReach) {
          entity.velocity.clear();
          entity.acceleration.clear();
        }

        if (this.destroyOnReach && this.respawnOnDestroy) {
          //simulate respawn
          Object.assign(entity, EntityFactory.createMouseFollower(), { ID: entity.ID });
        } else if (this.destroyOnReach) {
          this.ecs.removeEntity(entity.ID);
        }
        return;
      }
    }

    let dir = this.getDirection(entity);
    this.scaleIfNeeded(dir);
    entity.acceleration.setVec(dir);
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

  //Dummy function, should never be called
  getDirection(entity: MouseFollowerEntity) {
    console.error("called a dummy function");
    return entity.acceleration;
  }

  getDirectionWithLookAhead(entity: MouseFollowerEntity) {
    let pos = entity.position.copy();
    let vel = entity.velocity.copy();
    pos.addVec(vel.mulNum(this.lookAheadSteps));
    let dir = MathHelper.direction2d(pos, this.target).mulNum(this.accelerationScale);
    Vector.store(pos, vel);
    return dir;
  }

  getDirectionNoLookAhead(entity: MouseFollowerEntity) {
    return MathHelper.direction2d(entity.position, this.target).mulNum(this.accelerationScale);
  }

  //Dummy function, should never be called
  scaleIfNeeded(dir: Vector) {
    console.error("called a dummy function");
  }

  scaleByRandom(dir: Vector){
    dir.addNum(MathHelper.getSignedRandom() * this.randomFactorScale * this.accelerationScale);
  }

  destroy() {
    this.input.off("mousemove", this.mouseMove);
  }
}
