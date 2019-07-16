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
    const offscreen = layer.getFrame().transferControlToOffscreen();
    this.send({ type: "canvas_buffer_transmit", canvas: offscreen }, [offscreen]);
    this.send({ type: "canvas_resize", width: this.canvas.size.x, height: this.canvas.size.y });
    this.canvas.onResize(this.resize, this);
    this.input.onAll(this.transmitInput, this);
  }

  destroy() {
    this.canvas.offResize(this.resize);
    this.input.offAll(this.transmitInput);
    this.send({ type: "destroy" });
  }

  resize(size: Vec2) {
    this.send({ type: "canvas_resize", width: size.x, height: size.y });
  }

  async update(dt: number) {
    this.input.executeQueue();
    this.send({ type: "frame_start", dt });
    await this.createFramePromise();
    return;
  }

  receive(message: WorkerMessage) {
    if (message.type == "frame_end")
      this.triggerFrameEnded();
  }
  triggerFrameEnded() { }

  send(message: EngineMessage, transferrable?: any) {
    this.worker!.postMessage(message, transferrable);
  }
  transmitInput(event: string, ...args: any[]) {
    this.send({ type: "input", name: event, data: args });
  }

  createFramePromise() {
    return new Promise(resolve => {
      this.triggerFrameEnded = () => {
        this.triggerFrameEnded = () => { };
        resolve();
      }
    });
  }

}
