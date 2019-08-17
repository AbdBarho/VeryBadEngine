import Frame from "../../core/canvas/layers/Frame";
import EmptySystem from "../../ecs/system/Emptysystem";

export default class FlushBuffer extends EmptySystem {
  output: OffscreenCanvas;
  buffers: Frame[];
  constructor(layer: OffscreenCanvas, buffers: Frame[]) {
    super('FlushBuffer');
    this.output = layer;
    this.buffers = buffers;
  }

  update() {
    const context = this.output.getContext("2d") as OffscreenCanvasRenderingContext2D;
    context.globalAlpha = 0.5;
    this.buffers.forEach(frame => context.drawImage(frame.getBuffer(), 0, 0, this.output.width, this.output.height));
    context.globalAlpha = 1;
  }
}
