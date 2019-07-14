import Layer from "../../core/canvas/layers/Layer";
import EmptySystem from "../../ecs/system/Emptysystem";

export default class LayerClearer extends EmptySystem {
  layer: Layer;
  constructor(layer: Layer, ) {
    super("LayerClearer" + layer.getIndex());
    this.layer = layer;
  }

  update() {
    this.layer.clear();
  }
}
