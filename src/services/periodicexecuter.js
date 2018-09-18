import Logger from "./logger";
export default class PeriodicExecuter {
  /**
   * @param {String} name
   * @param {Number} updateInterval
   * @param {Function} callback
   */
  constructor(name, updateInterval, callback) {
    this.logger = new Logger(this, name);
    this.updateInterval = updateInterval;
    this.callback = callback;
    this.timer = null;
    this.lastTime = 0;
  }

  start() {
    let now = new Date().getMilliseconds();
    let delay = now - this.lastTime;
    delay = delay < this.updateInterval ? delay : 0;
    this.timer = setTimeout(() => this.run(), delay);
  }

  run() {
    let now = this.lastTime = new Date().getMilliseconds();
    this.callback();
    let timeTaken = new Date().getMilliseconds() - now;
    let nextUpdateDelay = this.updateInterval - timeTaken;
    if (nextUpdateDelay < 0) {
      this.logger.log(1, "update took extra", -nextUpdateDelay, "ms, updateInterval is", this.updateInterval, "ms");
      nextUpdateDelay = 0;
    }
    this.timer = setTimeout(() => this.run(), nextUpdateDelay);
  }

  stop() {
    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}
