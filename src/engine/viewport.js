import ResizableCanvas from "./resizablecanvas";
import EventManager from "../services/eventmanager";

export default class Viewport extends EventManager {
  constructor() {
    super();
    this.canvas = new ResizableCanvas();
    this.canvasParameters = this.canvas.getParamaters();
    this.canvas.on("parametersChanged", (params) => this.canvasParameters = params);
  }

  /**
   * @param {"Scale"|"Shift"} name
   * @param {"x"|"y"} axis
   */
  get(name, axis) {
    return this.canvasParameters[axis + name];
  }

  /**
   * @param {Number} x
   * @param {Number} y
   * @returns {{x:Number, y: Number}} from pixels in page to game units, (0,0) being top left of canvas
   */
  shiftAndScaleMousePos(x, y) {
    x -= this.canvasParameters.xShift;
    x /= this.canvasParameters.xScale;

    y -= this.canvasParameters.yShift;
    y /= this.canvasParameters.yScale;

    return { x, y };
  }
}
