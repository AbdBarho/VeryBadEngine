import App from "./src/app";
import EventManager from "./src/services/eventmanager";
// import EngineWorker from "./src/webworker/engine.worker";
// let worker = new EngineWorker();

window.addEventListener("load", () => {
  let game = new App();
  (window as any).game = game;
  (window as any).eventManager = EventManager;
  for (let i = 0; i < 100; i++)
    game.engine.addRandomFollower();
  setTimeout(() => game.start(), 0);
});