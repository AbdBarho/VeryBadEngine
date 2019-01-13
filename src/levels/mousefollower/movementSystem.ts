import MovementSystem from "../../systems/movement/Movement";

export default class MouseFollowerMovementSystem extends MovementSystem {
  isFrozen = false;
  constructor() {
    super();
    this.name = "MouseFollowerMovementSystem";
    this.required.push("mouseFollower");
  }

  changeFreezeState() {
    if (this.isFrozen) {
      this.update = super.update;
      this.isFrozen = false
    } else {
      this.update = this.doNothing;
      this.isFrozen = true;
    }
  }

  doNothing() {
    //nothing
  }

}
