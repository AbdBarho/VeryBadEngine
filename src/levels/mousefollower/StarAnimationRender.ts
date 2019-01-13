import Canvas from "../../core/Canvas";
import { StarAnimation } from "../../ecs/Component";
import Entity from "../../ecs/Entity";
import System from "../../ecs/system/System";
import Vector from "../../math/Vector";
import Layer from "../../core/Layer";
import Update from "../../ecs/system/Update";

interface StarAnimationEntity extends Entity {
  position: Vector;
  starAnimation: StarAnimation;
}

export default class StarAnimationRenderer extends System {
  layer: Layer;
  constructor(layerNumber: number, canvas: Canvas) {
    super("StarAnimationRender", Update.every, ["starAnimation", "position"]);
    this.layer = canvas.getLayer(layerNumber);
  }

  addIfCompatible(entity: Entity) {
    if (super.addIfCompatible(entity)) {
      this.cacheRender(entity as StarAnimationEntity);
      return true;
    }
    return false;
  }

  updateEntity(entity: StarAnimationEntity, dt: number) {
    // console.log(entity);
    let { position, starAnimation } = entity;
    let { progress, lifeTime, rotationSpeed, maxRadius, cachedDrawing } = starAnimation;


    let [cx, cy] = position.values;
    progress = (progress + dt) % lifeTime;

    if (!cachedDrawing)
      cachedDrawing = this.cacheRender(entity);

    let half = lifeTime / 2;
    let scale = Math.abs(progress - half) / lifeTime;
    // at least half the scale
    let size = Math.trunc(maxRadius * (scale + 0.5));

    // rotations
    let angle = rotationSpeed * progress;
    this.layer.rotate(angle, cx, cy);
    this.layer.alpha(scale / 2);
    this.layer.drawImage(cachedDrawing, cx - size / 2, cy - size / 2, size, size);
    this.layer.resetRotation();
    this.layer.alpha(1);

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
