import System from "../../ecs/system/system";
import InputManager from "../../engine/inputmanager";
import Vector from "../../math/vector";
import EntityFactory from "../../factory/factory";
import ECS from "../../ecs/ecs";

export default class ExplosionOnClick extends System {
  input: InputManager;
  ecs: ECS;
  constructor(input: InputManager, ecs: ECS) {
    super([]);
    this.ecs = ecs;
    this.input = input;
    this.update = this.doNothing;
    input.on("mousedown", this.handleKey, this);
  }

  handleKey(keyName: string | Vector) {
    if (keyName === "Mouse1")
      this.update = this.createExplosion;
  }

  createExplosion() {
    let explosion = EntityFactory.createExplosion();
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