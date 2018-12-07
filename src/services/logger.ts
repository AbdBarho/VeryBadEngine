import Vector from "../math/vector";
import Config from "../config/config";

const GLOBAL_VERBOSITY = Config.LOGGER.VERBOSITY;
const LOGGERS = [console.error, console.warn, console.log];

let debugState: any = {};
const FPS_UPDATE_INTERVAL = 1000; //in ms
let numUpdates = 0;
let time = 0;

export default class Logger {
  private prefix: string;
  private verbosity = GLOBAL_VERBOSITY;

  constructor(obj: any, prefix: string) {
    this.prefix = prefix;
    this.verbosity = GLOBAL_VERBOSITY;

    //completely disable logging for performance reasons
    if (GLOBAL_VERBOSITY === -1) {
      this.log = () => { };
      Logger.debugInfo = () => { };
    }

  }

  setVerbosity(verbosity: number) {
    this.verbosity = Math.min(verbosity, GLOBAL_VERBOSITY);
  }

  log(level: 0 | 1 | 2, ...params: any[]) {
    if (level > this.verbosity)
      return;

    let loggingFunc = LOGGERS[level] || console.log;
    loggingFunc(this.prefix, ":", ...params);
  }

  static fps(dt: number) {
    numUpdates++;
    time += dt;
    if (time < FPS_UPDATE_INTERVAL)
      return;
    this.debugInfo("FPS", (numUpdates * 1000 / time).toFixed(2));
    time = 0;
    numUpdates = 0;
  }

  static debugInfo(name: any, val?: any) {
    if (typeof name === "object") {
      for (let [key, value] of Object.entries(name)) {
        if (value === false || value === undefined)
          delete debugState[key];
        else if (typeof value === "number" && !Number.isInteger(value))
          debugState[key] = value.toFixed(3);
        else if (value instanceof Vector)
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

    this.renderDebug();
  }

  static renderDebug() {
    let div = document.getElementById("state");
    let str = "";
    for (let [key, value] of Object.entries(debugState))
      str += key + ": " + value + "\n";
    div!.innerText = str;
  }

  static debugState(obj: any) {
    obj = Object.assign({}, obj)
    for (let key in obj)
      obj[key] = obj[key].toString();
    this.debugInfo(obj);
  }
}
