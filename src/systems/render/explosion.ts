import Canvas from "../../core/canvas";
import { ExplosionModel } from "../../ecs/component";
import ECS from "../../ecs/ecs";
import Entity from "../../ecs/entity";
import System from "../../ecs/system/system";
import StepFunctions from "../../math/step";
import Vector from "../../math/vector";

interface Explosion extends Entity {
  position: Vector;
  explosion: boolean;
  explosionModel: ExplosionModel;
}

export default class ExplosionRender extends System {
  canvas: Canvas;
  ecs: ECS;
  constructor(canvas: Canvas, ecs: ECS) {
    super(["explosion", "explosionModel", "position"]);
    this.canvas = canvas;
    this.ecs = ecs;
  }

  updateEntity(entity: Explosion, dt: number) {
    let { explosionModel, position } = entity;
    let { progress, lifeTime, radius, color } = explosionModel;
    //update animation progress
    progress = progress + dt;
    if (progress > lifeTime) {
      this.ecs.removeEntity(entity.ID);
      return;
    }



    radius.cache();
    position.cache();
    let percent = progress / lifeTime;

    position.mulVec(this.canvas.config.scale);
    radius.mulVec(this.canvas.config.scale);
    radius.mulNum(StepFunctions.smoothStop(percent, 2));

    let ctx = this.canvas.ctx;
    ctx.fillStyle = color.slice(0, -1) + "," + StepFunctions.smoothStart(1 - percent, 5) + ")";
    ctx.beginPath();
    ctx.ellipse(position.values[0], position.values[1], radius.values[0], radius.values[1], 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    radius.uncache();
    position.uncache();
    //save updated progress
    entity.explosionModel.progress = progress;

  }

}
