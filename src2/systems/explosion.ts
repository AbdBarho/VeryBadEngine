import MultiSystem from "../ecs/system/multisystem";
import Vector from "../math/vector";
import ObjectUtils from "../util/object";
import StepFunctions from "../math/step";
import MathHelper from "../math/math";
import Logger from "../services/logger";

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
      { name: "sources", compontents: ["explosion", "explosionVelocity", "maxExplosionDistance", "position"] },
      { name: "targets", compontents: ["explodes", "velocity", "position"] }
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
    //all explosions handeled, new ones will be queud in the next frame, if any
    this.entities.sources = {};

  }

  applyExplosion(source: ExplosionEntity, target: ExplodableEntity) {
    target.position.cache();
    //distance
    target.position.subVec(source.position);
    //FIXME: always splits into 4, why?
    let mag2 = target.position.magSquared();
    let distanceScale = mag2 / (source.maxExplosionDistance ** 2);
    if (distanceScale < 1) {
      let power = (1 - distanceScale) * source.explosionVelocity;
      let dir = MathHelper.rotation2d(target.position).mulNum(power);
      // Logger.debugInfo({ power, "added speed": target.position });
      target.velocity.addVec(dir);
    }
    target.position.uncache();
  }
}