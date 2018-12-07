import InputManager from "../../core/inputManager";
import ECS from "../../ecs/ecs";
import EmptySystem from "../../ecs/system/emptySystem";
import EntityFactory from "../../factory/factory";
import Logger from "../../services/logger";
import MouseFollowerSystem from "./system";
import MouseFollowerMovementSystem from "./movementSystem";

export default class MouseFollowerController extends EmptySystem {
  input: InputManager;
  ecs: ECS;
  system: MouseFollowerSystem;
  movement: MouseFollowerMovementSystem;

  constructor(input: InputManager, ecs: ECS, system: MouseFollowerSystem, movement: MouseFollowerMovementSystem) {
    super();
    this.input = input;
    this.ecs = ecs;
    this.system = system;
    this.movement = movement;
    Logger.debugInfo("Current Behavior", "normal");
  }

  init() {
    this.input.onKey("keydown", this.handleKey, this);
  }

  handleKey(keyName: string) {
    let newBehavior;
    switch (keyName) {
      case "Enter":
        this.spawnMouseFollowers();
        break;
      case "Delete":
        this.removeMouseFollowers();
        break;
      case "Digit1":
        // normal
        newBehavior = "normal";
        this.system.config.stopOnReach = false;
        this.system.config.destroyOnReach = false;
        this.system.config.respawnOnDestroy = true;
        this.system.config.lookAheadSteps = 0;
        this.system.config.randomFactorScale = 0;
        break;
      case "Digit2":
        // go to mouse
        newBehavior = "go to mouse";
        this.system.config.stopOnReach = true;
        this.system.config.destroyOnReach = false;
        this.system.config.respawnOnDestroy = true;
        this.system.config.lookAheadSteps = 200;
        this.system.config.randomFactorScale = 0;
        break;
      case "Digit3":
        // black hole
        newBehavior = "black hole";
        this.system.config.stopOnReach = false;
        this.system.config.destroyOnReach = true;
        this.system.config.respawnOnDestroy = true;
        this.system.config.lookAheadSteps = 200;
        this.system.config.randomFactorScale = 0;
        break;
      case "Digit4":
        //random
        newBehavior = "random";
        this.system.config.stopOnReach = false;
        this.system.config.destroyOnReach = false;
        this.system.config.respawnOnDestroy = true;
        this.system.config.lookAheadSteps = 0;
        this.system.config.randomFactorScale = 1;
        break;
      case "Digit5":
        // freeze/unfreeze
        this.system.changeFreezeState();
        this.movement.changeFreezeState();
        break;
      default:
        break;
    }
    if(newBehavior)
      Logger.debugInfo("Current Behavior", newBehavior);
  }

  spawnMouseFollowers() {
    for (let i = 0; i < 100; i++)
      this.ecs.queueEntity(EntityFactory.createMouseFollower());
    Logger.debugInfo("Num mouseFollowers", Object.keys(this.system.entities).length + 100);
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
