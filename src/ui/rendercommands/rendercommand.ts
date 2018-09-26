import BoundingBox from "../../objects/boundingbox";
import { CanvasParameters } from "../canvas";

export default abstract class RenderCommand {
  target: BoundingBox;
  params: CanvasParameters;
  constructor(target: BoundingBox, canvasParams: CanvasParameters) {
    this.target = target;
    this.params = canvasParams;
  }
  abstract calculate(): this;
  abstract execute(ctx: CanvasRenderingContext2D): void;
}