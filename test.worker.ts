// Worker.ts
const ctx: Worker = self as any;

// Respond to message from parent thread
ctx.addEventListener("message", (event) => {
  console.log("I am worker", event.data);
});

// weird hack for type script
export default null as any;
