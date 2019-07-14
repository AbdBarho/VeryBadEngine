import Engine from "./src/engine/Engine";

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

// import Worker from "./test.worker";
// const canvas = document.createElement('canvas');
// canvas.width = 1070;
// canvas.height = 500;
// document.body.appendChild(canvas);
// const offscreen = canvas.transferControlToOffscreen();
// const worker = new Worker();

// worker.postMessage({ canvas: offscreen }, [offscreen]);
// worker.addEventListener("message", (event: any) => { });

// setTimeout(()=> canvas.width = 233, 2000)
