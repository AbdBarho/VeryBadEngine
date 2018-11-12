import InputManager from "../../core/inputManager";
import ECS from "../../ecs/ecs";
import EmptySystem from "../../ecs/system/emptySystem";
import EntityFactory from "../../factory/factory";
import Vector from "../../math/vector";
import Logger from "../../services/logger";
import MouseFollowerSystem from "../mouseFollower";

export default class MouseFollowerController extends EmptySystem {
  input: InputManager;
  ecs: ECS;
  system: MouseFollowerSystem;
  constructor(input: InputManager, ecs: ECS, system: MouseFollowerSystem) {
    super();
    this.input = input;
    this.ecs = ecs;
    this.system = system;
  }

  init() {
    this.input.on("keydown", this.handleKey, this);
  }
  
  handleKey(keyName: string | Vector) {
    switch (keyName) {
      case "Enter":
        this.spawnMouseFollowers();
        break;
      case "Delete":
        this.removeMouseFollowers();
        break;
      case "Digit1":
        this.system.reverseFreezeState();
        break;
      case "Digit2":
        this.system.config.stopOnReach = !this.system.config.stopOnReach;
        break;
      case "Digit3":
        this.system.config.destroyOnReach = !this.system.config.destroyOnReach;
        break;
      case "Digit4":
        this.system.config.respawnOnDestroy = !this.system.config.respawnOnDestroy;
        break;
      case "Digit5":
        this.system.config.lookAheadSteps = this.system.config.lookAheadSteps === 0 ? 250 : 0;
        break;
      case "Digit6":
        this.system.config.randomFactorScale = this.system.config.randomFactorScale === 0 ? 1 : 0;
        break;
      default:
        break;
    }

    Logger.debugState(Object.assign({}, this.system.config));
  }

  spawnMouseFollowers() {
    for (let i = 0; i < 100; i++)
      this.ecs.queueEntity(EntityFactory.createMouseFollower());
    Logger.debugInfo("Num mouseFollowers", Object.keys(this.system.entities).length);
  }

  removeMouseFollowers() {
    let i = 100;
    for (let id in this.system.entities) {
      this.ecs.removeEntity(id);
      if (--i == 0)
        break;
    }
    Logger.debugInfo("Num mouseFollowers", Object.keys(this.system.entities).length);
  }

  destroy() {
    this.input.off("keydown", this.handleKey);
  }

}
