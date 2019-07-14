import EmptySystem from "../../engine/ecs/system/Emptysystem";
import Layer from "../../engine/core/canvas/layers/Layer";
import Frame from "../../engine/core/canvas/layers/Frame";

export default class FlushBuffer extends EmptySystem {
  layer: Layer;
  buffers: Frame[];
  constructor(layer: Layer, buffers: Frame[]) {
    super('FlushBuffer');
    this.layer = layer;
    this.buffers = buffers;
  }

  update() {
    this.buffers.forEach(
      (buffer) => this.layer.ctx.drawImage(buffer.frame, 0, 0, this.layer.width, this.layer.height)
    )
  }
}
