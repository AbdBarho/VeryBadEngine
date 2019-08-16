import Canvas from "../engine/core/canvas/Canvas";
import InputManager from "../engine/core/Inputmanager";
import LevelWorkerController from "./mousefollower/LevelWorkerController";

export default class WorldManager {
  canvas: Canvas;
  input: InputManager;
  activeLevel: LevelWorkerController;

  isPaused = false; //TODO: we have 'isRunning' variable in the engine level, maybe get rid of that?
  constructor(canvas: Canvas, inputManager: InputManager) {
    this.canvas = canvas;
    this.input = inputManager;
    this.activeLevel = new LevelWorkerController(this);
  }

  init() {
    this.activeLevel.init();
  }

  start() {
    this.isPaused = false;
  }

  pause() {
    this.isPaused = true;
    //FIXME: maybe we need to clear the input queue here
  }

  destroy() {
    this.activeLevel.destroy();
  }

  async update(dt: number) {
    if(!this.isPaused)
      await this.activeLevel.update(dt);
    //probably show pause menu
  }
}
