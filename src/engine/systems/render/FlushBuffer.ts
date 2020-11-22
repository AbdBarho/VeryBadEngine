import Frame from "../../core/canvas/layers/Frame";
import EmptySystem from "../../ecs/system/Emptysystem";

export default class FlushBuffer extends EmptySystem {
  output: HTMLCanvasElement;
  frames: Frame[];
  ctx: CanvasRenderingContext2D;

  alpha = 0.1;
  constructor(output: HTMLCanvasElement, frames: Frame[]) {
    super('FlushBuffer');
    this.output = output;
    this.frames = frames;
    this.ctx = output.getContext("2d") as CanvasRenderingContext2D;
  }

  update() {
    this.ctx.globalAlpha = this.alpha;
    for (const frame of this.frames)
      this.ctx.drawImage(frame.getBuffer(), 0, 0, this.output.width, this.output.height);
    this.ctx.globalAlpha = 1;
  }
}
