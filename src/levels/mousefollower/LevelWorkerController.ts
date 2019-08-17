import { V2 } from '../../engine/math/VectorTypes';
import LevelWorkerController from '../worker/LevelWorkerController';
import MouseFollowerLevel from "./Level.worker";
import { MFEngineMessage, MFWorkerMessage } from './MessageTypes';

export default class MouseFollowerWorkerController extends LevelWorkerController {
  init() {
    const worker = this.worker = new MouseFollowerLevel() ;
    worker.onmessage = (e) => this.receive(e.data);

    const layer = this.canvas.getLayer(1);
    const offscreen = layer.transferToOffscreen();
    this.send({ type: "canvas_buffer_transmit", canvas: offscreen }, [offscreen]);
    this.send({ type: "canvas_resize", size: this.canvas.getSize() });

    this.canvas.onResize(this.resize, this);
    this.input.onAll(this.transmitInput, this);
  }

  resize(size: V2) {
    this.send({ type: "canvas_resize", size });
  }


  destroy() {
    this.canvas.offResize(this.resize);
    this.input.offAll(this.transmitInput);
    this.send({ type: "destroy" });
  }

  async update(dt: number) {
    // note: before each update, all the input events are send to the worker
    // they are handled there immediately, they are not queued.
    this.input.executeQueue();
    this.send({ type: "frame_start", dt });
    await new Promise(resolve => {
      this.triggerFrameEnded = () => { this.triggerFrameEnded = this.doNothing; resolve(); }
    });
    return;
  }


  receive(message: MFWorkerMessage) {
    if (message.type == "frame_end")
      this.triggerFrameEnded();
  }

  send(message: MFEngineMessage, transferrable?: any) {
    this.worker!.postMessage(message, transferrable);
  }

  transmitInput(event: string, ...args: any[]) {
    this.send({ type: "input", name: event, data: args });
  }

  triggerFrameEnded() { }

  doNothing() { }
}
