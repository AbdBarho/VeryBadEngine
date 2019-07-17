import Canvas from "../../engine/core/canvas/Canvas";
import InputManager from "../../engine/core/Inputmanager";
import Vec2 from "../../engine/math/vector/Vec2";
import { EngineMessage, WorkerMessage } from "./Messages";

export interface WorkerConstructor {
  new(): Worker;
}
export default class LevelWorkerController {
  canvas: Canvas;
  input: InputManager;
  levelWorker: WorkerConstructor;

  worker: Worker | null = null;
  constructor(canvas: Canvas, input: InputManager, levelWorker: WorkerConstructor) {
    this.canvas = canvas;
    this.input = input;
    this.levelWorker = levelWorker;
  }

  init() {
    const worker = this.worker = new this.levelWorker();
    worker.onmessage = (e) => this.receive(e.data);

    const layer = this.canvas.getLayer(0);
    const offscreen = layer.transferToOffscreen();
    this.send({ type: "canvas_buffer_transmit", canvas: offscreen }, [offscreen]);
    this.send({ type: "canvas_resize", size: layer.getSize() });
    this.canvas.onResize(this.resize, this);
    this.input.onAll(this.transmitInput, this);
  }

  destroy() {
    this.canvas.offResize(this.resize);
    this.input.offAll(this.transmitInput);
    this.send({ type: "destroy" });
  }

  resize(size: Vec2) {
    this.send({ type: "canvas_resize", size: size.toV2() });
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

  receive(message: WorkerMessage) {
    if (message.type == "frame_end")
      this.triggerFrameEnded();
  }

  send(message: EngineMessage, transferrable?: any) {
    this.worker!.postMessage(message, transferrable);
  }
  transmitInput(event: string, ...args: any[]) {
    this.send({ type: "input", name: event, data: args });
  }

  triggerFrameEnded() { }

  doNothing() { }

}
