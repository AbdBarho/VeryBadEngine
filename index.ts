import Engine from "./src/engine/Engine";
window.addEventListener("load", () => {
  let game = new Engine();
  (window as any).game = game;
  setTimeout(() => game.start(), 50);
});
