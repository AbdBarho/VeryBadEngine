import Frame from "../../Frame";
import EmptySystem from "../../ecs/system/Emptysystem";

export default class BackgroundColor extends EmptySystem {
  output: Frame;
  color: string;
  constructor(layer: Frame, color: string) {
    super('FlushBuffer');
    this.output = layer;
    this.color = color;
  }

  update() {
    this.output.fillWith(this.color);
  }
}
