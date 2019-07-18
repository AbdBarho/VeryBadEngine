import { InputProvider } from "../../engine/core/Inputmanager";
import ECS from "../../engine/ecs/ECS";
import Entity from "../../engine/ecs/Entity";
import System from "../../engine/ecs/system/System";
import MathHelper from "../../engine/math/Math";
import Vector from "../../engine/math/Vector";
import Vec2 from "../../engine/math/vector/Vec2";
import { V2 } from "../../engine/math/vector/VectorTypes";
import Factory from "./Factory";
import Config from "./LevelConfig";
import { Flag } from "../../engine/ecs/components/Component";

interface MouseFollowerEntity extends Entity {
  mouseFollower: Flag
  acceleration: Vec2
  position: Vec2
  velocity: Vec2
  borderBox: V2
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
    super("MouseFollowerSystem", ["acceleration", "position", "velocity", "mouseFollower", "borderBox"]);
    this.input = inputManager;
    this.ecs = ecs;
    this.updateSubRoutines();
  }

  init() {
    this.input.onMouseMove(this.mouseMove, this);
  }

  mouseMove(mousePos: V2) {
    this.target.set(mousePos.x, mousePos.y);
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
    const magSq = target.subVec(entity.position).abs().magnitudeSquared();
    const { x, y } = entity.borderBox;
    const reached = (x * x) + (y * y) > magSq;
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
    const randX = MathHelper.getSignedRandom() * this.randomFactorScale * this.accelerationScale;
    const randY = MathHelper.getSignedRandom() * this.randomFactorScale * this.accelerationScale;
    dir.addNums(randX, randY);
  }

  destroy() {
    this.input.off("mousemove", this.mouseMove);
  }
}
