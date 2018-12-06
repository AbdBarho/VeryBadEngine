import MultiSystem from "../../ecs/system/multiSystem";
import Vector from "../../math/vector";
import ObjectUtils from "../../util/objectUtils";
import StepFunctions from "../../math/step";
import MathHelper from "../../math/math";

interface ExplosionEntity {
  position: Vector;
  explosion: boolean;
  explosionVelocity: number;
  maxExplosionDistance: number;
}

interface ExplodableEntity {
  explodes: boolean;
  velocity: Vector;
  position: Vector;
}

export default class ExplosionSystem extends MultiSystem {
  constructor() {
    super([
      { name: "sources", components: ["explosion", "explosionVelocity", "maxExplosionDistance", "position"] },
      { name: "targets", components: ["explodes", "velocity", "position"] }
    ]);
  }

  update(dt: number) {
    if (ObjectUtils.isEmpty(this.entities.sources))
      return;

    let sources = this.entities.sources;
    let targets = this.entities.targets;
    for (let id in sources)
      for (let targetId in targets)
        this.applyExplosion(sources[id] as ExplosionEntity, targets[targetId] as ExplodableEntity);
    //all explosions handled, new ones will be queued in the next frame, if any
    this.entities.sources = {};

  }

  applyExplosion(source: ExplosionEntity, target: ExplodableEntity) {
    let pos = target.position.copy();
    //distance
    pos.subVec(source.position);
    let vectorLength = pos.magnitude();
    // console.log("length:", vectorLength);
    let distanceScale = vectorLength / source.maxExplosionDistance;
    if (distanceScale < 1) {
      let power = StepFunctions.smoothStart(1 - distanceScale, 3) * source.explosionVelocity;
      let dir = MathHelper.rotation2d(pos);
      target.velocity.addVec(dir.mulNum(power));
    }

    Vector.store(pos);
  }
}
