// import Engine from "./src/webworker/index";
import Engine from "./src/engine";
import EventManager from "./src/services/eventmanager";

let run = () => {
  let game = new Engine();
  (window as any).game = game;
  (window as any).eventManager = EventManager;
  for (let i = 0; i < 100; i++)
    game.addRandomFollower();
  setTimeout(() => game.start(), 0);
}

import EngineWorker from './src/webworker/engine.worker';

let run2 = () => {
  let worker = new EngineWorker();
  console.log(worker);
  worker.postMessage("Hello")
  console.log("posted");
}


window.addEventListener("load", run);