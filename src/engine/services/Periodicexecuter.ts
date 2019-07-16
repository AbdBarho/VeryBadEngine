import Logger from "./Logger";

export default class PeriodicExecuter {
  callback: (dt: number) => any;
  timer = 0;
  lastTime = 0;
  maxDelta = 0;
  isRunning = false;

  constructor(callback: (dt: number) => any, maxDelta = 100) {
    this.callback = callback;
    this.maxDelta = maxDelta;
    this.run = this.run.bind(this);

  }

  start() {
    if (this.isRunning)
      return;
    this.isRunning = true;
    const now = performance.now();
    let delay = now - this.lastTime;
    delay = delay < this.maxDelta ? delay : 0;
    this.lastTime = now - (this.maxDelta - delay);
    this.timer = requestAnimationFrame(this.run);
  }

  run() {
    const now = performance.now();
    const dt = now - this.lastTime;
    Logger.fps(dt);
    this.callback(dt < this.maxDelta ? dt : this.maxDelta).then(() => {
      if (!this.isRunning)
        return;
      this.lastTime = now;
      this.timer = requestAnimationFrame(this.run);
    });
  }

  stop() {
    this.isRunning = false;
    if (this.timer !== 0) {
      cancelAnimationFrame(this.timer);
      this.timer = 0;
    }
  }
}
