import Engine from "./src2/engine/engine";

/*
import Engine from "./src/engine";
import UI from "./src/ui/ui";

let run = () => {
  let ui = new UI();
  let game = new Engine(ui);
  (window as any).game = game;
  for (let i = 0; i < 100; i++)
    game.addRandomFollower();
  setTimeout(() => game.start(), 0);
}

import EngineWorker from './src/webworker/engine.worker';

let run2 = () => {
  // @ts-ignore
  let worker = new EngineWorker();
  console.log(worker);
  worker.postMessage("Hello")
  console.log("posted");
}
*/

let run = () => {
  let game = new Engine();
  (window as any).game = game;
  // for (let i = 0; i < 100; i++)
  //   game.addRandomFollower();
  // setTimeout(() => game.start(), 0);
}

window.addEventListener("load", run);