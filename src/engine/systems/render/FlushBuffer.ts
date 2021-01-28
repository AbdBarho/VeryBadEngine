import Frame from "../../Frame";
import EmptySystem from "../../ecs/system/Emptysystem";

export default class FlushBuffer extends EmptySystem {
  output: Frame;
  frames: Frame[];

  alpha = 0.1;
  constructor(output: Frame, frames: Frame[]) {
    super('FlushBuffer');
    this.output = output;
    this.frames = frames;
  }

  update() {
    this.output.alpha(this.alpha);
    for (const frame of this.frames)
      this.output.fillWithImage(frame.getBuffer());
    this.output.alpha(1);
  }
}
