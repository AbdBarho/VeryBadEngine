import Logger from "./logger";

export default class PeriodicExecuter {
  executeAfterTimeout: () => void;
  callback: (dt: number) => any;
  timer = 0;
  lastTime = 0;
  updateInterval = 0;
  isRunning = false;

  constructor(callback: (dt: number) => any) {
    this.callback = callback;
    this.executeAfterTimeout = () => this.run();
  }

  start(updateInterval = 17) {
    if (this.isRunning)
      return;
    this.isRunning = true;
    let now = performance.now();
    let delay = now - this.lastTime;
    delay = delay < updateInterval ? delay : 0;
    this.lastTime = now - (updateInterval - delay);
    this.timer = requestAnimationFrame(this.executeAfterTimeout);
  }

  run() {
    let now = performance.now();
    let dt = now - this.lastTime;
    Logger.fps(dt);
    this.callback(dt);
    this.lastTime = now;
    this.timer = requestAnimationFrame(this.executeAfterTimeout);
  }

  stop() {
    this.isRunning = false;
    if (this.timer !== 0) {
      cancelAnimationFrame(this.timer);
      this.timer = 0;
      this.updateInterval = 0;
    }
  }
}
