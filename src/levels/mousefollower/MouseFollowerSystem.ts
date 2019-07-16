import Config from "./LevelConfig";
import { InputProvider } from "../../engine/core/Inputmanager";
import { RectangularModel } from "../../engine/ecs/components/Component";
import ECS from "../../engine/ecs/ECS";
import Entity from "../../engine/ecs/Entity";
import System from "../../engine/ecs/system/System";
import MathHelper from "../../engine/math/Math";
import Vector from "../../engine/math/Vector";
import Vec2 from "../../engine/math/vector/Vec2";
import Factory from "./Factory";

interface MouseFollowerEntity extends Entity {
  mouseFollower: boolean;
  acceleration: Vec2;
  position: Vec2;
  velocity: Vec2;
  rectModel: RectangularModel;
}

const CONFIG = Config.SYSTEMS.MOUSE_FOLLOWER_SYSTEM;
export default class MouseFollowerSystem extends System {
  input: InputProvider;
  ecs: ECS;
  isFrozen = CONFIG.IS_FROZEN;
  stopOnReach = CONFIG.STOP_ON_REACH;
  destroyOnReach = CONFIG.DESTROY_ON_REACH;
  respawnOnDestroy = CONFIG.RESPAWN_ON_DESTROY;
  lookAheadSteps = CONFIG.LOOK_AHEAD_STEPS;
  randomFactorScale = CONFIG.RANDOM_FACTOR_SCALE;
  accelerationScale = CONFIG.ACCELERATION_SCALE;
  target = Vector.create(Config.WORLD.SIZE[0] / 2, Config.WORLD.SIZE[1] / 2);


  constructor(inputManager: InputProvider, ecs: ECS) {
    super("MouseFollowerSystem", ["acceleration", "position", "velocity", "mouseFollower"]);
    this.input = inputManager;
    this.ecs = ecs;
    this.updateSubRoutines();
  }

  init() {
    this.input.onMouseMove(this.mouseMove, this);
  }

  mouseMove(mousePos: Vec2) {
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
          Object.assign(entity, Factory.createMouseFollower(), { ID: entity.ID });
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
    let target = Vector.copy(this.target);
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
    let pos = Vector.copy(entity.position);
    let vel = Vector.copy(entity.velocity)
    pos.addVec(vel.mulNum(this.lookAheadSteps));
    let dir = MathHelper.direction2d(pos, this.target).mulNum(this.accelerationScale);
    Vector.store(pos, vel);
    return dir;
  }

  getDirectionNoLookAhead(entity: MouseFollowerEntity) {
    return MathHelper.direction2d(entity.position, this.target).mulNum(this.accelerationScale);
  }

  //Dummy function, should never be called
  scaleIfNeeded(dir: Vec2) {
    console.error("called a dummy function");
  }

  scaleByRandom(dir: Vec2) {
    dir.addNum(MathHelper.getSignedRandom() * this.randomFactorScale * this.accelerationScale);
  }

  destroy() {
    this.input.off("mousemove", this.mouseMove);
  }
}
