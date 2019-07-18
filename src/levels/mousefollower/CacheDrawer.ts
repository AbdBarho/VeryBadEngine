export type StarCacheParameters = {
  numSpikes: number
  minRadius: number
  maxRadius: number
  fillStyle: string
  opacityFactor: number
  numFrames: number
  rotationDirection: number //
  lifeTime: number // in ms
}

export default class CacheDrawer {
  static drawStar(params: StarCacheParameters): OffscreenCanvas {

    const { numFrames, minRadius, maxRadius, fillStyle, numSpikes, lifeTime, opacityFactor, rotationDirection } = params;

    const temp = new OffscreenCanvas(maxRadius * 2, maxRadius * 2);
    const tempCtx = temp.getContext("2d") as OffscreenCanvasRenderingContext2D;
    tempCtx.beginPath();
    tempCtx.fillStyle = fillStyle;
    tempCtx.translate(maxRadius, maxRadius);
    tempCtx.moveTo(0, 0 - minRadius);
    for (let i = 0; i < numSpikes; i++) {
      tempCtx.rotate(Math.PI / numSpikes);
      tempCtx.lineTo(0, 0 - maxRadius);
      tempCtx.rotate(Math.PI / numSpikes);
      tempCtx.lineTo(0, 0 - minRadius);
    }
    tempCtx.fill();
    tempCtx.closePath();

    const cache = new OffscreenCanvas(maxRadius * 2 * numFrames, maxRadius * 2);
    const ctx = cache.getContext("2d") as OffscreenCanvasRenderingContext2D;
    // draw along the x axis
    const dtPerFrame = lifeTime / numFrames;
    const offsetPerFrame = maxRadius * 2;
    const totalRotation = Math.PI * 2 / numSpikes;

    // console.log("lifeTime", lifeTime, "\n dt per frame", dtPerFrame)
    for (let currentFrame = 0; currentFrame < numFrames; currentFrame++) {
      const progress = dtPerFrame * currentFrame; // in ms

      const percent = progress / lifeTime;

      //only for alpha
      const distanceToMiddle = Math.abs(percent - 0.5)
      const alpha = distanceToMiddle * opacityFactor;
      if (alpha < 0.03)
        continue;
      ctx.globalAlpha = alpha;

      // rotate around the center of the new position
      const angle = totalRotation * percent * rotationDirection;
      // console.log(
      //   "\ncurrentFrame", currentFrame,
      //   "\nprogress", (progress / lifeTime * 100).toFixed(2), "%",
      //   "\nangle", (angle * 180 / Math.PI / (360 / numSpikes)).toFixed(2)
      // );

      const offsetX = offsetPerFrame * currentFrame;
      const cx = offsetX + maxRadius;
      const cy = maxRadius;
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.translate(-cx, -cy);
      ctx.drawImage(temp, offsetX, 0, offsetPerFrame, offsetPerFrame);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    return cache;
  }

}
