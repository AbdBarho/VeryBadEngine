import EventManager from "../services/eventmanager";

const GLOBAL_VERBOSITY = 2;
const LOGGERS = [console.error, console.warn, console.log];

let debugState = {};
let avgFps = 0;
export default class Logger {
  /**
   * @param {*} obj
   * @param {String} prefix
   */
  constructor(obj, prefix) {
    this.prefix = prefix;
    this.verbosity = GLOBAL_VERBOSITY;
    this.alreadyLogged = {};

    //completely disable logging for performance reasons
    if (GLOBAL_VERBOSITY === -1) {
      this.log = () => {};
      Logger.debugInfo = () => {};
    }

  }

  /**
   * @param {Number} verbosity
   */
  setVerbosity(verbosity) {
    this.verbosity = Math.min(verbosity, GLOBAL_VERBOSITY);
  }

  /**
   * @param {0|1|2} level
   * @param  {...any} params
   */
  log(level, ...params) {
    if (level > this.verbosity)
      return;

    let loggingFunc = LOGGERS[level] || console.log;
    loggingFunc(this.prefix, ":", ...params);
  }

  static fps(dt) {
    avgFps += dt;
    avgFps /= 2;
    this.debugInfo("FPS", Math.round(1 / avgFps));
  }

  static debugInfo(name, val) {
    if (typeof name === "object") {
      for (let [key, value] of Object.entries(name)) {
        if (value === false || value === undefined)
          delete debugState[key];
        else if (typeof value === "number" && !Number.isInteger(value))
          debugState[key] = value.toFixed(3);
        else if (value.getValues)
          debugState[key] = value.getValues().map(val => val.toFixed(3));
        else if (typeof value === "object" && !Array.isArray(value) || typeof value === "function")
          delete debugState[key];
        else
          debugState[key] = value;
      }
    } else if (val === false || val === undefined) {
      delete debugState[name];
    } else {
      debugState[name] = val;
    }

    EventManager.trigger("render_debug", debugState);
  }
}