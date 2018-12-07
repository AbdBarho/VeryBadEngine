import MovementSystem from "../../systems/movement/movement";

export default class MouseFollowerMovementSystem extends MovementSystem {
  isFrozen = false;
  constructor() {
    super();
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
