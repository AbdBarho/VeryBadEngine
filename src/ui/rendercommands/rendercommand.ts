import Vector from "../../math/vector";

export default abstract class RenderCommand {
  abstract scaleAndShift(scale: Vector, shift?: Vector): this;
  abstract execute(ctx: CanvasRenderingContext2D): void;
}