import Canvas from "../engine/core/canvas/Canvas";
import InputManager from "../engine/core/Inputmanager";
import LevelWorkerController from "./worker/LevelWorkerController";

export type LevelConstructor = {
  new(world: WorldManager): LevelWorkerController;
}
export default class WorldManager {
  canvas: Canvas;
  input: InputManager;
  idleLevels: LevelWorkerController[];
  activeLevels: LevelWorkerController[] = [];

  isPaused = false; //TODO: we have 'isRunning' variable in the engine level, maybe get rid of that?
  constructor(canvas: Canvas, inputManager: InputManager, levels: LevelConstructor[]) {
    this.canvas = canvas;
    this.input = inputManager;
    this.idleLevels = levels.map(Level => new Level(this));
  }

  async init(sequentially = true) {
    if (sequentially) {
      while (this.idleLevels.length) {
        const level = this.idleLevels.shift() as LevelWorkerController;
        level.setActive(true);
        await level.init();
        this.activeLevels.push(level);
      }
    } else {
      this.idleLevels.forEach(level => level.setActive(true));
      this.activeLevels = this.idleLevels;
      this.idleLevels = [];
      await Promise.all(this.activeLevels.map(level => level.init()));
    }
    this.activeLevels.forEach(level => level.send({ type: "all_levels_init" }));
  }

  start() {
    this.isPaused = false;
  }

  pause() {
    this.isPaused = true;
    //FIXME: maybe we need to clear the input queue here
  }

  destroy() {
    for (const level of this.activeLevels.concat(this.idleLevels))
      level.destroy();
  }

  async update(dt: number, sequentially = false) {
    if (this.isPaused)
      return;

    if (sequentially)
      for (const level of this.activeLevels)
        await level.update(dt);
    else
      return Promise.all(this.activeLevels.map(level => level.update(dt)));
  }

  setIdle(level: LevelWorkerController) {
    const index = this.activeLevels.indexOf(level);
    if (index === -1)
      return;
    this.activeLevels.splice(index, 1)
    this.idleLevels.push(level);
  }
}
