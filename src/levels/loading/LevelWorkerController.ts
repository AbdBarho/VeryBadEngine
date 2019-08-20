import { V2 } from '../../engine/math/VectorTypes';
import LevelWorkerController from '../worker/LevelWorkerController';
import WorldManager from '../WorldManager';
import LoadingLevel from "./Level.worker";

export default class LoadingWorkerController extends LevelWorkerController {
  constructor(world: WorldManager) {
    super(world, LoadingLevel);
  }

  async init() {
    const layer = this.canvas.getLayer(1);
    const offscreen = layer.transferToOffscreen();
    this.send({ type: "canvas_buffer_transmit", canvas: offscreen }, [offscreen]);
    this.send({ type: "canvas_resize", size: this.canvas.getSize() });
    this.canvas.onResize(this.resize, this);
    await this.sendAndWait({ type: "init_level" }, "init_done");
  }

  resize(size: V2) {
    this.send({ type: "canvas_resize", size });
  }

  async destroy() {
    this.canvas.offResize(this.resize);
    this.send({ type: "destroy" });
  }

  async update(dt: number) {
    return this.sendAndWait({ type: "frame_start", dt }, "frame_end");
  }

  receive() {
    //nothing, for now
  }

}
