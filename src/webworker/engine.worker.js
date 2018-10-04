import Engine from "../engine";

addEventListener("message", (e) => {
  console.log("I am engine WORKER", e);
  console.log(self)
});

export default self;