import ResizableCanvas from "./resizablecanvas";
import Vector from "../math/vector";

export default class Viewport extends ResizableCanvas {
  backgroundColor(color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.parameters.SIZE.get(0), this.parameters.SIZE.get(1));
  }
  
}
