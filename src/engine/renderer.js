import Logger from "../services/logger";
import Container from "../services/container";

export default class Renderer {
  constructor() {
    this.viewport = Container.get("Viewport");
    this.world = Container.get("World");
    this.logger = new Logger(this, "Renderer");
    this.isRendering = false;
    Container.register("Renderer", this);
  }

  render() {
    this.viewport.backgroundColor("black");
    for (let obj of this.world.getObjects())
      obj.render(this.viewport.getContext());
  }

}
