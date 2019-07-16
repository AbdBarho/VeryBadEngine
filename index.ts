import Engine from "./src/Engine";

window.addEventListener("load", () => {
  try {
    new OffscreenCanvas(100, 100);
  }
  catch {
    document.body.innerHTML = "<h1>This page only works on Chrome because OffScreenCanvas is not supported yet<h1>";
    return;
  }
  const game = new Engine();
  (window as any).game = game;
  setTimeout(() => game.start(), 50);
});
