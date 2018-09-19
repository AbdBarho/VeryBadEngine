import Logger from "../services/logger";
import Container from "../services/container";

export default class Renderer {
  constructor() {
    this.viewport = Container.getViewport();
    this.world = Container.getWorld();
    this.logger = new Logger(this, "Renderer");
    Container.register("Renderer", this);
  }

  render() {
    this.viewport.backgroundColor("black");
    for (let obj of this.world.getObjects())
      obj.render();
  }

}
