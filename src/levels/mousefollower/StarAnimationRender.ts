import Canvas from "../../core/Canvas";
import { StarAnimation } from "../../ecs/components/component";
import Entity from "../../ecs/Entity";
import System from "../../ecs/system/System";
import Layer from "../../core/Layer";
import Update from "../../ecs/system/Update";
import Vec2 from "../../math/vector/Vec2";

type Context = CanvasRenderingContext2D;

interface StarAnimationEntity extends Entity {
  position: Vec2;
  starAnimation: StarAnimation;
}

export default class StarAnimationRenderer extends System {
  layer: Layer;
  constructor(layer: Layer) {
    super("StarAnimationRender", Update.every, ["starAnimation", "position"]);
    this.layer = layer;
  }

  addIfCompatible(entity: Entity) {
    if (super.addIfCompatible(entity)) {
      this.cacheRender(entity as StarAnimationEntity);
      return true;
    }
    return false;
  }

  updateEntity(entity: StarAnimationEntity, dt: number) {
    let { position, starAnimation } = entity;
    let { progress, lifeTime, cachedDrawing, opacityFactor } = starAnimation;

    starAnimation.progress = progress = (progress + dt) % lifeTime;


    let scale = Math.abs(progress - lifeTime / 2) / lifeTime;
    // at least half the scale
    let size = starAnimation.maxRadius * (scale + 0.5);

    // rotations
    let angle = starAnimation.rotationSpeed * progress;
    this.layer.rotate(angle, position.x, position.y);
    this.layer.alpha(scale * opacityFactor);
    this.layer.drawImage(cachedDrawing, position.x - size / 2, position.y - size / 2, size, size);
    this.layer.resetRotation();
    this.layer.alpha(1);
  }

  cacheRender(entity: StarAnimationEntity) {
    let canvas = entity.starAnimation.cachedDrawing;
    let { numSpikes, color, minRadius, maxRadius } = entity.starAnimation;
    canvas.width = maxRadius * 2;
    canvas.height = maxRadius * 2;
    let ctx = canvas.getContext("2d");
    drawStar(ctx!, numSpikes, minRadius, maxRadius, color);
    entity.starAnimation.cachedDrawing = canvas;
  }
}

function drawStar(ctx: Context, numSpikes: number, minRadius: number, maxRadius: number, fillStyle: string) {
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
}
