import System from "../ecs/system";
import Entity from "../ecs/entity";
import Vector from "../math/vector";
import MathHelper from "../math/math";

interface MouseFollowerEntity extends Entity {
  mouseFollower: boolean;
  acceleration: Vector;
  position: Vector;
  velocity: Vector;
}

let ACCELERATION_SCALE = 0.0015;
export default class MouseFollowerSystem extends System {
  stopOnReach = false;
  lookAheadSteps = 0;
  randomFactorScale = 0;
  target = new Vector([1000, 500])
  constructor() {
    super(["acceleration", "position", "velocity", "mouseFollower"]);
  }

  updateEntity(entity: MouseFollowerEntity, dt: number) {
    if (entity.isFrozen)
      return

    entity.position.cache();
    entity.velocity.cache();
    entity.position.addVec(entity.velocity.mulNum(this.lookAheadSteps));
    let dir = MathHelper.direction2d(entity.position, this.target).mulNum(ACCELERATION_SCALE);
    if (this.randomFactorScale !== 0)
      dir.addNum(MathHelper.getSignedRandom() * this.randomFactorScale * ACCELERATION_SCALE);
    entity.acceleration.setVec(dir);

    entity.velocity.uncache();
    entity.position.uncache();

    entity.hasChanged = true;
  }
}