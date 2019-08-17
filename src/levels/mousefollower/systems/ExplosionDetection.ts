import MultiSystem from "../../../engine/ecs/system/Multisystem";
import MathHelper from "../../../engine/math/Math";
import StepFunctions from "../../../engine/math/Step";
import ObjectUtils from "../../../engine/util/ObjectUtils";
import { ExplosionEntity, ExplodableEntity } from "../Entities";

export default class ExplosionDetection extends MultiSystem {
  constructor() {
    super("ExplosionDetection", [
      { name: "sources", components: ["explosion", "explosionVelocity", "explosionRadius", "position"] },
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
    const dist = {
      x: target.position.x - source.position.x,
      y: target.position.y - source.position.y
    };
    const vectorLengthSq = dist.x * dist.x + dist.y * dist.y;

    const distanceScale = vectorLengthSq / (source.explosionRadius * source.explosionRadius);
    if (distanceScale < 1) {
      const power = StepFunctions.smoothStart(1 - distanceScale, 3) * source.explosionVelocity;
      let dir = MathHelper.rotation2d(dist);
      target.velocity.x += dir.x * power;
      target.velocity.y += dir.y * power;
    }
  }
}
