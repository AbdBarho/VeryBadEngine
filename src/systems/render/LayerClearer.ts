import EmptySystem from "../../ecs/system/emptySystem";
import Layer from "../../core/layer";

export default class LayerClearer extends EmptySystem {
  layer: Layer;
  constructor(layer: Layer) {
    super();
    this.layer = layer;
  }

  update() {
    this.layer.clear();
  }
}
