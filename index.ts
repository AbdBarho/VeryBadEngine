import Engine from "./src/Engine";

window.addEventListener("load", () => {
  try {
    const canvas = new OffscreenCanvas(100, 100);
    const ctx = canvas.getContext("2d");
    if (ctx == null)
      throw "Cannot get context";
  }
  catch {
    document.body.innerHTML = "<h1>This page only works on Chromium based browsers because OffScreenCanvas is not fully supported yet <h1>";
    return;
  }
  const game = new Engine();
  (window as any).game = game;
  // game.worldManager.init().then(() => {
  //   setTimeout(() => game.start(), 50);
  // });
  game.worldManager.init();
  game.start();
});
