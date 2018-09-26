import RenderCommand from "./rendercommand";
import Vector from "../../math/vector";
import BoundingBox from "../../objects/boundingbox";
import { CanvasParameters } from "../canvas";


export default class FillRect extends RenderCommand {
  cachedValues: number[] = new Array(4).fill(0);
  pos: Vector;
  size: Vector;
  centerShift: Vector;

  constructor(target: BoundingBox, canvasParams: CanvasParameters) {
    super(target, canvasParams);
    this.pos = this.target.pos;
    this.size = this.target.size;
    this.centerShift = this.target.centerShift;
    this.calculate();
  }

  calculate() {
    this.pos.cache();
    this.size.cache();
    this.pos.subVec(this.centerShift)
    this.pos.mulVec(this.params.SCALE);
    this.size.mulVec(this.params.SCALE);
    //prevents GC
    this.cachedValues[0] = this.pos.get(0);
    this.cachedValues[1] = this.pos.get(1);
    this.cachedValues[2] = this.size.get(0);
    this.cachedValues[3] = this.size.get(1);
    
    this.pos.uncache();
    this.size.uncache();
    return this;
  }

  execute(ctx: CanvasRenderingContext2D) {
    if (this.target.hasChanged())
      this.calculate();
    ctx.fillStyle = this.target.color;
    ctx.fillRect.apply(ctx, this.cachedValues);
  }

}