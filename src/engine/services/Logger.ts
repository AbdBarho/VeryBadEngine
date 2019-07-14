import Config from "../config/Config";

const GLOBAL_VERBOSITY = Config.LOGGER.VERBOSITY;

let debugState: any = {};
const div = document.getElementById("state");
const FPS_UPDATE_INTERVAL = 1000; //in ms
let numUpdates = 0;
let time = 0;
let fps: number[] = [];


export default class Logger {

  static fps(dt: number) {
    numUpdates++;
    time += dt;
    fps.push(dt);
    if (time < FPS_UPDATE_INTERVAL) {
      if (fps.length > 300)
        this.showFPSDebug();
      return;
    }
    this.debugInfo("FPS", (numUpdates * 1000 / time).toFixed(2));
    time = 0;
    numUpdates = 0;
  }

  static showFPSDebug() {
    const avg = (fps.reduce((acc, curr) => acc + curr, 0) / fps.length);
    const avgStr = (1000 / avg).toFixed(2);
    fps = [];
    Logger.debugInfo("AVG FPS", avgStr);
  }

  static debugInfo(name: string, val: any) {
    debugState[name] = val;
    this.renderDebug();
  }

  static renderDebug() {
    let str = "";
    for (let [key, value] of Object.entries(debugState))
      str += key + ": " + value + "\n";
    div!.innerText = str;
  }

  static debugState(obj: any) {
    obj = Object.assign({}, obj)
    for (let key in obj)
      obj[key] = obj[key].toString();
    for (let [key, val] of Object.entries(obj))
      this.debugInfo(key, val);
  }
}

//completely disable logging for performance reasons
if (GLOBAL_VERBOSITY === -1) {
  Logger.debugInfo = () => { };
  Logger.renderDebug = () => { };
  div!.remove();
}
