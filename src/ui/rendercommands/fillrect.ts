import RenderCommand from "./rendercommand";
import Vector from "../../math/vector";

export interface FillRectParamter {
  position: Vector,
  size: Vector,
  color: string
}

export default class FillRect extends RenderCommand {
  position: Vector;
  size: Vector;
  color: string;
  cachedValues: number[] = [];

  constructor(params: FillRectParamter) {
    super();
    this.position = params.position;
    this.size = params.size;
    this.color = params.color;
  }

  scaleAndShift(scale: Vector, shift?: Vector) {
    if (shift)
      this.position.subVec(shift);
    this.position.mulVec(scale);
    this.size.mulVec(scale);
    this.cachedValues = this.position.getValues().concat(this.size.getValues());
    return this;
  }

  execute(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect.apply(ctx, this.cachedValues);
  }

}