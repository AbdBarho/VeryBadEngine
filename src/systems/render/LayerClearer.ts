import Layer from "../../core/Layer";
import EmptySystem from "../../ecs/system/EmptySystem";
import Update from "../../ecs/system/Update";

export default class LayerClearer extends EmptySystem {
  layer: Layer;
  constructor(layer: Layer, ) {
    super("LayerClearer" + layer.getIndex(), Update.every);
    this.layer = layer;
  }

  update() {
    this.layer.clear();
  }
}
