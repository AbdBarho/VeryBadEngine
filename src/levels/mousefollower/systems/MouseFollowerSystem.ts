import { InputProvider } from "../../../engine/core/Inputmanager";
import { Flag } from "../../../engine/ecs/components/Component";
import ECS from "../../../engine/ecs/ECS";
import Entity from "../../../engine/ecs/Entity";
import System from "../../../engine/ecs/system/System";
import MathHelper from "../../../engine/math/Math";
import { V2 } from "../../../engine/math/VectorTypes";
import Config from "../Config";
import Factory from "../services/Factory";
const WORLD_SIZE = Config.WORLD.SIZE;

interface MouseFollowerEntity extends Entity {
  mouseFollower: Flag
  acceleration: V2
  position: V2
  velocity: V2
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
  target = { x: WORLD_SIZE.x / 2, y: WORLD_SIZE.y / 2 };

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
    this.target.x = mousePos.x;
    this.target.y = mousePos.y;
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
          entity.velocity.x = 0;
          entity.velocity.y = 0;
          entity.acceleration.x = 0;
          entity.acceleration.y = 0;
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
    entity.acceleration.x = dir.x;
    entity.acceleration.y = dir.y;
    entity.hasChanged = true;

  }

  targetReached(entity: MouseFollowerEntity) {
    let x = this.target.x - entity.position.x;
    let y = this.target.y - entity.position.y;
    //calculate distance
    const magSq = (x * x) + (y * y);
    const box = entity.borderBox;
    return (box.x * box.x) + (box.y * box.y) > magSq;
  }

  //Dummy function, should never be called
  getDirection(entity: MouseFollowerEntity) {
    console.error("called a dummy function");
    return entity.acceleration;
  }

  getDirectionWithLookAhead(entity: MouseFollowerEntity) {
    const vel = entity.velocity;
    const pos = entity.position;
    const newPos = {
      x: pos.x + vel.x * this.lookAheadSteps,
      y: pos.y + vel.y * this.lookAheadSteps
    }
    let dir = MathHelper.direction2d(newPos, this.target);
    dir.x *= this.accelerationScale;
    dir.y *= this.accelerationScale;
    return dir;
  }

  getDirectionNoLookAhead(entity: MouseFollowerEntity) {
    const dir = MathHelper.direction2d(entity.position, this.target)
    dir.x *= this.accelerationScale;
    dir.y *= this.accelerationScale;
    return dir;
  }

  //Dummy function, should never be called
  scaleIfNeeded(dir: V2) {
    console.error("called a dummy function");
  }

  scaleByRandom(dir: V2) {
    dir.x += MathHelper.getSignedRandom() * this.randomFactorScale * this.accelerationScale;
    dir.y += MathHelper.getSignedRandom() * this.randomFactorScale * this.accelerationScale;
  }

  destroy() {
    this.input.off("mousemove", this.mouseMove);
  }
}
