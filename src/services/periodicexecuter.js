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
  }

  start() {
    this.logger.log(2, "starting periodic execution, period:", this.updateInterval, "ms");
    this.run();
  }

  run() {
    let now = new Date().getMilliseconds();
    try {
      this.callback();
    } catch (error) {
      this.logger.log(0, "Unexpected error while executing the callback:", error);
    }
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
      this.logger.log(2, "stopped periodic execution");
    } else {
      this.logger.log(2, "nothing is executing, already stopped");
    }
  }

}
