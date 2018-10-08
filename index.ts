import Engine from "./src2/engine/engine";

/*
import EngineWorker from './src/webworker/engine.worker';

let run2 = () => {
  // @ts-ignore
  let worker = new EngineWorker();
  console.log(worker);
  worker.postMessage("Hello")
  console.log("posted");
}
*/

let run = () => (window as any).game = new Engine();

window.addEventListener("load", run);