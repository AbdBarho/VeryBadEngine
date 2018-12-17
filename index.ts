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
let idle = (window as any).requestIdleCallback;
import Engine from "./src/engine";
let run = () => {
  let game = new Engine();
  (window as any).game = game;
  idle(() => requestAnimationFrame(() => idle(() => game.start())));

}

window.addEventListener("load", run);
