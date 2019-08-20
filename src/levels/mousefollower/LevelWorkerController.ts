import { V2 } from '../../engine/math/VectorTypes';
import LevelWorkerController from '../worker/LevelWorkerController';
import WorldManager from '../WorldManager';
import MouseFollowerLevel from "./Level.worker";

export default class MouseFollowerWorkerController extends LevelWorkerController {
  constructor(world: WorldManager) {
    super(world, MouseFollowerLevel);
  }

  async init() {
    const layer = this.canvas.getLayer(0);
    const offscreen = layer.transferToOffscreen();
    this.send({ type: "canvas_buffer_transmit", canvas: offscreen }, [offscreen]);
    this.send({ type: "canvas_resize", size: this.canvas.getSize() });
    this.canvas.onResize(this.resize, this);
    await this.sendAndWait({ type: "init_level" }, "init_done");
    this.input.onAll(this.transmitInput, this);
  }

  resize(size: V2) {
    this.send({ type: "canvas_resize", size });
  }

  transmitInput(event: string, ...args: any[]) {
    this.send({ type: "input", name: event, data: args });
  }

  async destroy() {
    this.canvas.offResize(this.resize);
    this.input.offAll(this.transmitInput);
    this.send({ type: "destroy" });
  }

  async update(dt: number) {
    // note: before each update, all the input events are send to the worker
    // they are handled there immediately, they are not queued.
    this.input.executeQueue();
    return this.sendAndWait({ type: "frame_start", dt }, "frame_end");
  }

  receive() {
    //nothing, for now
  }

}
