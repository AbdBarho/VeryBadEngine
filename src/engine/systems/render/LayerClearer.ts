import Layer from "../../core/canvas/layers/Layer";
import EmptySystem from "../../ecs/system/Emptysystem";
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
