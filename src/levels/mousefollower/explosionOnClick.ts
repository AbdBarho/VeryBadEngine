import InputManager from "../../core/InputManager";
import ECS from "../../ecs/ECS";
import EmptySystem from "../../ecs/system/EmptySystem";
import Update from "../../ecs/system/Update";
import Factory from "./Factory";

export default class ExplosionOnClick extends EmptySystem {
  input: InputManager;
  ecs: ECS;
  constructor(input: InputManager, ecs: ECS) {
    super("ExplosionOnClick", Update.every);
    this.ecs = ecs;
    this.input = input;
    this.update = this.doNothing;
  }

  init() {
    this.input.onKey("mousedown", this.handleKey, this);
  }

  handleKey(keyName: string) {
    if (keyName === "Mouse1")
      this.update = this.createExplosion;
  }

  createExplosion() {
    let explosion = Factory.createExplosion();
    explosion.position.setVec(this.input.mousePos);
    this.ecs.queueEntity(explosion);
    //reset
    this.update = this.doNothing;
  }

  doNothing() {
    //nothing
  }

  destroy() {
    this.input.off("mousedown", this.handleKey);
  }

}
