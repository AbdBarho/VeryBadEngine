import Canvas from "../../engine/core/canvas/Canvas";
import InputManager from "../../engine/core/Inputmanager";
import WorldManager from "../WorldManager";

export default abstract class LevelWorkerController {
  world: WorldManager;
  canvas: Canvas;
  input: InputManager;
  worker: Worker | null = null;

  constructor(world: WorldManager) {
    this.world = world;
    this.canvas = world.canvas;
    this.input = world.input;
  }
  abstract init(): any;
  abstract destroy(): any;
  async abstract update(dt: number): Promise<any>;
}
