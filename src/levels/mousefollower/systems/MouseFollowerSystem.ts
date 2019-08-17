import { InputProvider } from "../../../engine/core/Inputmanager";
import ECS from "../../../engine/ecs/ECS";
import System from "../../../engine/ecs/system/System";
import { V2 } from "../../../engine/math/VectorTypes";
import Config from "../Config";
import { MouseFollowerEntity } from "../types/Entities";
import Factory from "../services/Factory";
import { getRandomColor, clearV2, direction2d, getSignedRandom } from "../../../engine/math/Math";

const WORLD_SIZE = Config.WORLD.SIZE;

const CONFIG = Config.SYSTEMS.MOUSE_FOLLOWER_SYSTEM;
export default class MouseFollowerSystem extends System {
  input: InputProvider;
  ecs: ECS;
  stopOnReach = CONFIG.STOP_ON_REACH;
  destroyOnReach = CONFIG.DESTROY_ON_REACH;
  respawnOnDestroy = CONFIG.RESPAWN_ON_DESTROY;
  lookAheadSteps = CONFIG.LOOK_AHEAD_STEPS;
  randomFactorScale = CONFIG.RANDOM_FACTOR_SCALE;
  accelerationScale = CONFIG.ACCELERATION_SCALE;
  target = { x: WORLD_SIZE.x / 2, y: WORLD_SIZE.y / 2 };

  constructor(inputManager: InputProvider, ecs: ECS) {
    super("MouseFollowerSystem",
      ["acceleration", "position", "velocity", "mouseFollower", "borderBox"],
      ["isFrozen"]
    );
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

  updateSubRoutines() {
    this.getDirection = this.lookAheadSteps ? this.getDirectionWithLookAhead : this.getDirectionNoLookAhead;
    this.scaleIfNeeded = this.randomFactorScale ? this.scaleByRandom : () => { };
  }

  updateEntity(entity: MouseFollowerEntity, dt: number) {
    if (this.destroyOnReach || this.stopOnReach) {
      if (this.targetReached(entity)) {
        if (this.destroyOnReach) {
          if (!this.respawnOnDestroy)
            return this.ecs.removeEntity(entity.ID);

          entity.rectColor = getRandomColor();
          entity.position = Factory.getVectorInWorld();
          clearV2(entity.velocity);
          clearV2(entity.acceleration);
        }
        if (this.stopOnReach) {
          clearV2(entity.velocity);
          clearV2(entity.acceleration);
        }
        return;
      }
    }

    const dir = this.getDirection(entity);
    this.scaleIfNeeded(dir);
    entity.acceleration.x = dir.x;
    entity.acceleration.y = dir.y;

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
    let dir = direction2d(newPos, this.target);
    dir.x *= this.accelerationScale;
    dir.y *= this.accelerationScale;
    return dir;
  }

  getDirectionNoLookAhead(entity: MouseFollowerEntity) {
    const dir = direction2d(entity.position, this.target);
    dir.x *= this.accelerationScale;
    dir.y *= this.accelerationScale;
    return dir;
  }

  //Dummy function, should never be called
  scaleIfNeeded(dir: V2) {
    console.error("called a dummy function");
  }

  scaleByRandom(dir: V2) {
    dir.x += getSignedRandom() * this.randomFactorScale * this.accelerationScale;
    dir.y += getSignedRandom() * this.randomFactorScale * this.accelerationScale;
  }

  destroy() {
    this.input.off("mousemove", this.mouseMove);
  }
}
