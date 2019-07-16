import { InputProvider } from "../../engine/core/Inputmanager";
import ECS from "../../engine/ecs/ECS";
import EmptySystem from "../../engine/ecs/system/Emptysystem";
import Factory from "./Factory";
import MouseFollowerSystem from "./MouseFollowerSystem";
import MouseFollowerMovementSystem from "./MovementSystem";

export default class MouseFollowerController extends EmptySystem {
  input: InputProvider;
  ecs: ECS;
  system: MouseFollowerSystem;
  movement: MouseFollowerMovementSystem;

  constructor(input: InputProvider, ecs: ECS, system: MouseFollowerSystem, movement: MouseFollowerMovementSystem) {
    super("MouseFollowerController");
    this.input = input;
    this.ecs = ecs;
    this.system = system;
    this.movement = movement;
    // Logger.debugInfo("Current Behavior", "normal");
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
        this.system.stopOnReach = false;
        this.system.destroyOnReach = false;
        this.system.respawnOnDestroy = true;
        this.system.lookAheadSteps = 0;
        this.system.randomFactorScale = 0;
        break;
      case "Digit2":
        // go to mouse
        newBehavior = "go to mouse";
        this.system.stopOnReach = true;
        this.system.destroyOnReach = false;
        this.system.respawnOnDestroy = true;
        this.system.lookAheadSteps = 200;
        this.system.randomFactorScale = 0;
        break;
      case "Digit3":
        // black hole
        newBehavior = "black hole";
        this.system.stopOnReach = false;
        this.system.destroyOnReach = true;
        this.system.respawnOnDestroy = true;
        this.system.lookAheadSteps = 200;
        this.system.randomFactorScale = 0;
        break;
      case "Digit4":
        //random
        newBehavior = "random";
        this.system.stopOnReach = false;
        this.system.destroyOnReach = false;
        this.system.respawnOnDestroy = true;
        this.system.lookAheadSteps = 0;
        this.system.randomFactorScale = 1;
        break;
      case "Digit5":
        // freeze/unfreeze
        this.system.changeFreezeState();
        this.movement.changeFreezeState();
        break;
      default:
        break;
    }
    this.system.updateSubRoutines();
    // if(newBehavior)
    //   Logger.debugInfo("Current Behavior", newBehavior);
  }

  spawnMouseFollowers() {
    for (let i = 0; i < 100; i++)
      this.ecs.queueEntity(Factory.createMouseFollower());
    // Logger.debugInfo("Num mouseFollowers", Object.keys(this.system.entities).length + 100);
  }

  removeMouseFollowers() {
    let i = 100;
    for (let id in this.system.entities) {
      this.ecs.removeEntity(id);
      if (--i == 0)
        break;
    }
    // Logger.debugInfo("Num mouseFollowers", Object.keys(this.system.entities).length);
  }

  destroy() {
    this.input.off("keydown", this.handleKey);
  }

}
