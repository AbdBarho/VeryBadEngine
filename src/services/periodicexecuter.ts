import Logger from "./logger";
export default abstract class PeriodicExecuter {
  logger: Logger;
  executeAfterTimeout: () => void;
  timer = 0;
  lastTime = 0;
  updateInterval = 0;

  constructor(name: string) {
    this.logger = new Logger(this, name);
    this.executeAfterTimeout = () => this.run();
  }

  start(updateInterval = 17) {
    let now = performance.now();
    let delay = now - this.lastTime;
    delay = delay < updateInterval ? delay : 0;
    this.lastTime = now - (updateInterval - delay);
    this.updateInterval = updateInterval;
    this.beforeStart();
    this.startTimer(delay);
  }
  beforeStart() {
    //nothing
  }

  startTimer(delay: number) {
    this.timer = setTimeout(this.executeAfterTimeout, delay);
  }



  run() {
    let now = performance.now();
    let dt = now - this.lastTime;
    this.execute(dt);
    let nextUpdateDelay = this.updateInterval - (performance.now() - now);
    if (nextUpdateDelay < 0) {
      // this.logger.log(1, "update took extra", -nextUpdateDelay, "ms");
      nextUpdateDelay = 0;
    }
    this.lastTime = now;
    this.startTimer(nextUpdateDelay);
  }

  /**
   * @param dt num milliseconds since last call
   */
  abstract execute(dt: number): any;

  stop() {
    if (this.timer !== 0) {
      this.clearTimer();
      this.timer = 0;
      this.updateInterval = 0;
      this.afterStop();
    }
  }

  clearTimer() {
    clearTimeout(this.timer);
  }

  afterStop() {
    //nothing
  }
}
