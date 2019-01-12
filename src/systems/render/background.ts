import Canvas from "../../core/canvas";
import EmptySystem from "../../ecs/system/emptySystem";
import Layer from "../../core/layer";

export default class BackgroundColor extends EmptySystem {
  layer: Layer;
  color: string;
  constructor(layerNumber: number, color: string, canvas: Canvas, hasOwnFrame: boolean) {
    super();
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
