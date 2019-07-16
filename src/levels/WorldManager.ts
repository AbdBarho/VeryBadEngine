import Canvas from "../engine/core/canvas/Canvas";
import InputManager from "../engine/core/Inputmanager";
import LevelWorkerController from "./worker/LevelWorkerController";
import MouseFollowerLevel from "./mousefollower/Level.worker";
import InputReplicator from "./worker/InputReplicator";

export default class WorldManager {
  canvas: Canvas;
  activeLevel: LevelWorkerController;

  isPaused = false; //TODO: we have 'isRunning' variable in the engine level, maybe get rid of that?
  constructor(canvas: Canvas, inputManager: InputManager) {
    this.canvas = canvas;
    // const inputReplicator = new InputReplicator();
    this.activeLevel = new LevelWorkerController(canvas, inputManager, MouseFollowerLevel);
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
