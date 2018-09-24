import PeriodicExecuter from "./periodicexecuter";

export default abstract class RequestAnimationFrameExecuter extends PeriodicExecuter {
  constructor(name: string) {
    super(name);
  }

  startTimer(delay: number) {
    this.timer = requestAnimationFrame(this.executeAfterTimeout);
  }

  clearTimer() {
    cancelAnimationFrame(this.timer);
  }
}