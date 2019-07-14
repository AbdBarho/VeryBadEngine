// Worker.ts
const ctx: Worker = self as any;

import s from './src/engine/math/Math';

// Respond to message from parent thread
ctx.addEventListener("message", (event) => {
  console.log("I am worker", event.data);
  const canvas = event.data.canvas;
  console.log(canvas);

  const d = canvas.getContext("2d");
  if (d === null) {
    throw "no context";
  }
  render(d);

});

const x = s.getRandomInt.bind(null);

function render(c: OffscreenCanvasRenderingContext2D) {
  c.fillStyle = `rgb(${x(300)}, ${x(300)},${x(300)}, 0.1)`
  c.fillRect(0, 0, x(1000), x(500))
  // requestAnimationFrame(()=> render(c))
}

// weird hack for type script
export default null as any;
