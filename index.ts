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
import Engine from "./src/engine";
let run = () => {
  let game = new Engine();
  (window as any).game = game;
  (window as any).requestIdleCallback(() => game.start());
}

window.addEventListener("load", run);
