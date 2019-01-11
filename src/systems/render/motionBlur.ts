import EmptySystem from "../../ecs/system/emptySystem";
import Canvas from "../../core/canvas";
import LastFrameCache from "./frameCache";

export default class MotionBlurRenderer extends EmptySystem {
  cache: HTMLCanvasElement;
  canvas: Canvas;
  alpha: number;
  constructor(canvas: Canvas, frameCache: LastFrameCache, alpha: number) {
    super();
    this.cache = frameCache.getCachedFrame();
    this.canvas = canvas;
    this.alpha = alpha;
  }

  update() {
    this.canvas.alpha(this.alpha);
    this.canvas.fillImage(this.cache);
    this.canvas.alpha(1);
  }
}
