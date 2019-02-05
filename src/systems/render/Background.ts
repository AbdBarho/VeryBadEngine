import Canvas from "../../core/Canvas";
import Layer from "../../core/Layer";
import EmptySystem from "../../ecs/system/Emptysystem";
import Update from "../../ecs/system/Update";

export default class BackgroundColor extends EmptySystem {
  layer: Layer;
  color: string;
  constructor(layerNumber: number, color: string, canvas: Canvas, hasOwnFrame: boolean) {
    super("BackgroundColor", Update.every);
    this.color = color;
    this.layer = canvas.getLayer(layerNumber);
    if (hasOwnFrame)
      this.update = this.renderOnce;
  }

  init() {
    document.body.style.backgroundColor = this.color;
  }

  update() {
    this.layer.backgroundSolidColor(this.color);
  }

  renderOnce() {
    this.layer.backgroundSolidColor(this.color);
    this.update = () => { };
  }

  destroy() {
    document.body.style.backgroundColor = "";
  }
}
