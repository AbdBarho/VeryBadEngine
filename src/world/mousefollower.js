import WorldObject from "./worldobject";
import Container from "../services/container";


export default class MouseFollower extends WorldObject {
  constructor() {
    super();
    this.inputManager = Container.get("InputManager");
    this.viewport = Container.get("Viewport");
    this.velocity = 5;
    this.coords = { x: 0, y: 0 };
    this.targetCoords = { x: 0, y: 0 };
  }
  update() {
    let mousePos = this.inputManager.getMousePos();
    Object.assign(this.targetCoords, mousePos);

    if (this.coords.x > this.targetCoords.x - 10)
      this.coords.x -= this.velocity;
    else
      this.coords.x += this.velocity;


    if (this.coords.y > this.targetCoords.y - 10)
      this.coords.y -= this.velocity;
    else
      this.coords.y += this.velocity;
  }

  render(ctx) {
    ctx.fillStyle = "white";
    let obj = this.viewport.unshiftAndUnscale(this.coords.x, this.coords.y);
    let size = this.viewport.unshiftAndUnscale(20, 20);
    ctx.fillRect(obj.x, obj.y , size.x, size.y);
  }

}
