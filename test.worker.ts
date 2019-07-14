// Worker.ts
const ctx: Worker = self as any;

// Respond to message from parent thread
ctx.addEventListener("message", (event) => {
  console.log("I am worker", event.data);
  const canvas: OffscreenCanvas = event.data.canvas;

  canvas.width = 500;

  const ctx = canvas.getContext("2d");

  render(ctx);
});

function render(ctx: any) {
  ctx.fillStyle = "#ccc";
  ctx.fillRect(0, 0, 500, 500)

  // requestAnimationFrame(() => render(ctx))


}

// weird hack for typescript
export default null as any;
