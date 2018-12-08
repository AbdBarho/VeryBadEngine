import System from "../../ecs/system/system";
import Canvas from "../../core/canvas";
import { StarAnimation } from "../../ecs/component";
import Entity from "../../ecs/entity";
import Vector from "../../math/vector";

interface StarAnimationEntity extends Entity {
  position: Vector;
  starAnimation: StarAnimation;
}

export default class StarAnimationRenderer extends System {
  canvas: Canvas;
  constructor(canvas: Canvas) {
    super(["starAnimation", "position"]);
    this.canvas = canvas;
  }

  init() {
    for (let id in this.entities)
      this.cacheRender(this.entities[id] as StarAnimationEntity);
  }

  updateEntity(entity: StarAnimationEntity, dt: number) {
    // console.log(entity);
    let { position, starAnimation } = entity;
    let { progress, lifeTime, rotationSpeed, maxRadius, cachedDrawing } = starAnimation;


    let [cx, cy] = position.values;
    progress += dt;
    if (progress > lifeTime)
      progress = 0;

    if (!cachedDrawing)
      cachedDrawing = this.cacheRender(entity);

    let half = lifeTime / 2;
    let scale = Math.abs(progress - half) / lifeTime;
    // at least half the scale
    let size = Math.floor(maxRadius * (scale + 0.5));

    // rotations
    let angle = rotationSpeed * progress;
    this.canvas.rotate(angle, cx, cy);
    this.canvas.alpha(scale);
    this.canvas.drawImage(cachedDrawing, cx - size / 2, cy - size / 2, size, size);
    this.canvas.resetRotation();
    this.canvas.alpha(1);

    starAnimation.progress = progress;
  }

  cacheRender(entity: StarAnimationEntity) {
    let cachedDrawing = entity.starAnimation.cachedDrawing;
    if (!cachedDrawing) {
      let { numSpikes, color, minRadius, maxRadius } = entity.starAnimation;
      let canvas = document.createElement("canvas");
      canvas.width = maxRadius * 2;
      canvas.height = maxRadius * 2;
      let ctx = canvas.getContext("2d");
      drawStar(ctx!, numSpikes, minRadius, maxRadius, color);
      cachedDrawing = entity.starAnimation.cachedDrawing = canvas;
    }
    return cachedDrawing;
  }
}

function drawStar(ctx: CanvasRenderingContext2D, numSpikes: number, minRadius: number, maxRadius: number, fillStyle: string) {
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = fillStyle;
  ctx.translate(maxRadius, maxRadius);
  ctx.moveTo(0, 0 - minRadius);
  for (let i = 0; i < numSpikes; i++) {
    ctx.rotate(Math.PI / numSpikes);
    ctx.lineTo(0, 0 - maxRadius);
    ctx.rotate(Math.PI / numSpikes);
    ctx.lineTo(0, 0 - minRadius);
  }
  ctx.fill();
  ctx.closePath();
  ctx.restore();
}
