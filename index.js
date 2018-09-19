import Engine from "./src/engine";
// import EngineWorker from "./src/webworker/engine.worker";
// let worker = new EngineWorker();

window.addEventListener("load", () => {
  let game = new Engine();
  game.start();
});