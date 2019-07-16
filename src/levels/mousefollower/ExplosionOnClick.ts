import { InputProvider } from "../../engine/core/Inputmanager";
import ECS from "../../engine/ecs/ECS";
import EmptySystem from "../../engine/ecs/system/Emptysystem";
import Factory from "./Factory";

export default class ExplosionOnClick extends EmptySystem {
  input: InputProvider;
  ecs: ECS;
  constructor(input: InputProvider, ecs: ECS) {
    super("ExplosionOnClick");
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
