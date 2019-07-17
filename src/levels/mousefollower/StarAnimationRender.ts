import { StarAnimation } from "../../engine/ecs/components/Component";
import Entity from "../../engine/ecs/Entity";
import System from "../../engine/ecs/system/System";
import Vec2 from "../../engine/math/vector/Vec2";
import Frame from "../../engine/core/canvas/layers/Frame";

type Context = CanvasRenderingContext2D;

interface StarAnimationEntity extends Entity {
  position: Vec2;
  starAnimation: StarAnimation;
}

export default class StarAnimationRenderer extends System {
  frame: Frame;
  constructor(frame: Frame) {
    super("StarAnimationRender", ["starAnimation", "position"]);
    this.frame = frame;
  }

  addIfCompatible(entity: Entity) {
    if (super.addIfCompatible(entity)) {
      return true;
    }
    return false;
  }

  updateEntity(entity: StarAnimationEntity, dt: number) {
    const { position, starAnimation } = entity;
    const { lifeTime, cache, opacityFactor, rotationSpeed } = starAnimation;

    const progress = starAnimation.progress = (starAnimation.progress + dt) % lifeTime;
    const scale = Math.abs(progress - lifeTime / 2) / lifeTime;
    // at least half the scale
    const size = starAnimation.maxRadius * (scale + 0.5);
    // rotations

    const newAlpha = scale * opacityFactor;
    // don't render almost invisible or invisible stars
    // console.log(newAlpha)
    if (newAlpha < 0.04)
      return;
    this.frame.rotate(rotationSpeed * progress, position.x, position.y);
    this.frame.alpha(scale * opacityFactor);
    this.frame.drawImage(cache, position.x - size / 2, position.y - size / 2, size, size);
    this.frame.resetRotation();
    this.frame.alpha(1);
  }

}
