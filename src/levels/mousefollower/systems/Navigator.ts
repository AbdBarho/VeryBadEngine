import EmptySystem from "../../../engine/ecs/system/Emptysystem";
import { getV2, V2 } from "../../../engine/math/VectorTypes";
import Config from "../Config";
import MouseFollowerSystem from "./MouseFollowerSystem";
import { getRandomInt, interpolate } from "../../../engine/math/Math";
import MouseFollowerFactory from "../services/Factory";
import Frame from "../../../engine/core/canvas/layers/Frame";

const SIZE = Config.WORLD.SIZE;

export default class Navigator extends EmptySystem {
  mfs: MouseFollowerSystem;
  frame: Frame;
  points: V2[] = [
    getV2(.5 * SIZE.x, .5 * SIZE.y),
    getV2(.2 * SIZE.x, .3 * SIZE.y),
    getV2(.8 * SIZE.x, .7 * SIZE.y),
    getV2(.2 * SIZE.x, .7 * SIZE.y),
    getV2(.8 * SIZE.x, .3 * SIZE.y)
  ]
  // points: V2[] = Array(10).fill(0).map(() => MouseFollowerFactory.getVectorInWorld());
  currentIndex = 0;
  nextIndex = 1;

  progress = 0;
  interval = 2000;
  position: V2 = getV2();
  constructor(mfs: MouseFollowerSystem, frame: Frame) {
    super("Navigator");
    this.mfs = mfs;
    this.frame = frame;
  }


  update(dt: number) {
    this.progress += dt;
    if (this.progress >= this.interval) {
      this.progress = this.progress % this.interval;
      this.currentIndex = this.nextIndex;

      let newVal = getRandomInt(this.points.length);
      if (newVal === this.nextIndex)
        newVal = (this.nextIndex + 1) % this.points.length;

      this.nextIndex = newVal;
    }
    if (this.mfs.useMouse)
      return;

    this.updatePosition();
    this.mfs.setTarget(this.position);
  }

  updatePosition(): void {
    //interpolate between current and next
    const percent = this.progress / this.interval;
    const current = this.points[this.currentIndex];
    const next = this.points[this.nextIndex];
    this.position.x = interpolate(current.x, next.x, percent);
    this.position.y = interpolate(current.y, next.y, percent);

    // this.frame.debugPoint(this.position.x, this.position.y, 50, "#fff");
  }

  getCurrent(): V2 {
    return this.position;
  }
}
