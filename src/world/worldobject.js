import Container from "../services/container";

export default class WorldObject {
  constructor() {
    this.viewport = Container.getViewport();
  }
  
  update() {
    throw "not implemented";
  }

  render() {
    throw "not implemented";
  }

  getBoundingRect() {
    throw "not implemented";
  }
}
