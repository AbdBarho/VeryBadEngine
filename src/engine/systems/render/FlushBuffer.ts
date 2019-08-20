import Frame from "../../core/canvas/layers/Frame";
import EmptySystem from "../../ecs/system/Emptysystem";

export default class FlushBuffer extends EmptySystem {
  output: OffscreenCanvas;
  frames: Frame[];
  ctx: OffscreenCanvasRenderingContext2D;
  constructor(output: OffscreenCanvas, frames: Frame[]) {
    super('FlushBuffer');
    this.output = output;
    this.frames = frames;
    this.ctx = output.getContext("2d") as OffscreenCanvasRenderingContext2D;
  }

  update() {
    // this.ctx.clearRect(0, 0, this.output.width, this.output.height);
    this.ctx.globalAlpha = 0.1;
    for (const frame of this.frames)
      this.ctx.drawImage(frame.getBuffer(), 0, 0, this.output.width, this.output.height);
    // this.ctx.globalAlpha = 1;
  }
}
