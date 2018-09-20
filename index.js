import App from "./src/app";
// import EngineWorker from "./src/webworker/engine.worker";
// let worker = new EngineWorker();

window.addEventListener("load", () => {
  let game = new App();
  game.engine.addRandomFollower();
  setTimeout(() => {
    game.start();
  }, 0);
});