import Canvas from "../engine/Canvas";
import InputManager from "../engine/Inputmanager";
import ECS from "../engine/ecs/ECS";
import LoadingLevel from "./loading/LoadingLevel";

export type LevelConstructor = {
  new(world: World): ECS;
}

export default class World {
  canvas: Canvas;
  input: InputManager;
  idleLevels: ECS[];
  activeLevels: ECS[] = [];

  isPaused = false; //TODO: we have 'isRunning' variable in the engine level, maybe get rid of that?
  constructor(canvas: Canvas, inputManager: InputManager, levels: LevelConstructor[]) {
    this.canvas = canvas;
    this.input = inputManager;
    this.idleLevels = levels.map(Level => new Level(this));
  }

  init() {
    while (this.idleLevels.length) {
      const level = this.idleLevels.shift() as ECS;
      level.init();
      this.activeLevels.push(level);
    }
    for (const level of this.activeLevels)
      if (level instanceof LoadingLevel)
        level.fade();

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

  update(dt: number) {
    if (this.isPaused) {
      this.input.emptyQueue();
      return;
    }
    this.input.executeQueue();
    for (const level of this.activeLevels)
      level.update(dt);
  }

  setIdle(level: ECS) {
    const index = this.activeLevels.indexOf(level);
    if (index === -1)
      return;
    this.activeLevels.splice(index, 1)
    this.idleLevels.push(level);
  }
}
