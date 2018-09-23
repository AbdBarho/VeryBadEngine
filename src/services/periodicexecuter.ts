import Logger from "./logger";
export default class PeriodicExecuter {
  logger: Logger;
  updateInterval: number;
  callback: (num: number) => void;
  timer: number | null = null;
  lastTime = 0;

  constructor(name: string, updateInterval: number, callback: (num: number) => void, context?: any) {
    this.logger = new Logger(this, name);
    this.updateInterval = updateInterval;
    this.callback = context ? callback.bind(context) : callback;
  }

  start() {
    let now = performance.now();
    let delay = now - this.lastTime;
    delay = delay < this.updateInterval ? delay : 0;
    this.lastTime = now - (this.updateInterval - delay);
    this.timer = setTimeout(() => this.run(), delay);
  }

  run() {
    let now = performance.now();
    let dt = now - this.lastTime;
    //divide by 1000 to call the update in seconds
    this.callback(dt / 1000);
    let timeTaken = performance.now() - now;
    let nextUpdateDelay = this.updateInterval - timeTaken;
    if (nextUpdateDelay < 0) {
      // this.logger.log(1, "update took extra", -nextUpdateDelay, "ms");
      nextUpdateDelay = 0;
    }
    this.lastTime = now;
    this.timer = setTimeout(() => this.run(), nextUpdateDelay);
  }

  stop() {
    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}
