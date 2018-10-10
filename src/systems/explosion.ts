import MultiSystem from "../ecs/system/multisystem";
import Vector from "../math/vector";
import ObjectUtils from "../util/object";
import StepFunctions from "../math/step";
import MathHelper from "../math/math";
import Logger from "../services/logger";
import ECS from "../ecs/ecs";
import EntityFactory from "../factory/factory";

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
  point = [0, 0];
  constructor(ecs: ECS) {
    super([
      { name: "sources", compontents: ["explosion", "explosionVelocity", "maxExplosionDistance", "position"] },
      { name: "targets", compontents: ["explodes", "velocity", "position"] }
    ]);

    // ecs.queueEntity({ ...EntityFactory.createBasicEntity(), debugCirclePoint: this.point });
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
    let mag2 = target.position.magSquared();
    let distanceScale = mag2 / (source.maxExplosionDistance ** 2);
    if (distanceScale < 1) {
      let power = StepFunctions.smoothStart(1 - distanceScale, 4) * source.explosionVelocity;
      let dir = MathHelper.rotation2d(target.position);
      // this.plot(dir);
      target.velocity.addVec(dir.mulNum(power));
    }
    target.position.uncache();
  }

  plot(dir: Vector) {
    this.point[0] = dir.values[0];
    this.point[1] = dir.values[1];
  }
}