import Engine from "./src/engine";
import Logger from "./src/logger";
import InputManager from "./src/inputmanager";
import ResizableCanvas from "./src/resizablecanvas";

class Game {
  constructor() {
    this.logger = new Logger(this, "Game");
    this.engine = new Engine();
    this.inputManager = new InputManager();
    this.canvas = new ResizableCanvas();

    //...
  }

  startGame() {
    this.logger.log(2, "starting...");
    this.engine.start();
    this.logger.log(2, "started");
  }

  stopGame() {
    this.logger.log(2, "stopping...");
    this.engine.stop();
    this.logger.log(2, "stopped");
  }

}
window.addEventListener("load", () => {
  let game = new Game();
  game.startGame();
});
