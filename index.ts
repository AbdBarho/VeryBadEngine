let idle = (window as any).requestIdleCallback;
import Engine from "./src/engine";
let run = () => {
  let game = new Engine();
  (window as any).game = game;
  idle(() => requestAnimationFrame(() => game.start()));
}

window.addEventListener("load", run);
