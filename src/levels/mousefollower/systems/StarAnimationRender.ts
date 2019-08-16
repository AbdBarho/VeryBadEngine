import { StarAnimation } from "../../../engine/ecs/components/Component";
import Entity from "../../../engine/ecs/Entity";
import System from "../../../engine/ecs/system/System";
import Frame from "../../../engine/core/canvas/layers/Frame";
import { V2 } from "../../../engine/math/VectorTypes";


interface StarAnimationEntity extends Entity {
  position: V2;
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
    const { lifeTime, cache, borderBox, numFrames } = starAnimation;


    const progress = starAnimation.progress = (starAnimation.progress + dt) % lifeTime;
    const currentFrame = Math.floor((progress / lifeTime) * numFrames);

    // all frames are on the x axis
    const { x: width, y: height } = borderBox;
    this.frame.ctx.drawImage(cache,
      width * currentFrame, 0, width, height, //from where to read the image
      position.x - width / 2, position.y - height / 2, width, height   // where to write the image
    );
  }

}
