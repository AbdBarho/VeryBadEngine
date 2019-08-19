import Canvas from "../../engine/core/canvas/Canvas";
import InputManager from "../../engine/core/Inputmanager";
import WorldManager from "../WorldManager";

import { BasicWorkerMessage, BasicEngineMessage } from './types/MessageTypes';
import { WorkerConstructor } from "./types/WorkerTypes";

type GetMessageTypes<Source, Key extends keyof Source> = Pick<Source, Key>[Key]

//FIXME: this might need to be made generic
type WorkerMessageType = GetMessageTypes<BasicWorkerMessage, 'type'>

interface Resolver {
  promise: Promise<any>;
  resolve: (value?: unknown) => void
}

export default abstract class LevelWorkerController {
  world: WorldManager;
  canvas: Canvas;
  input: InputManager;
  worker: Worker;
  messagePromises: { [messageType in WorkerMessageType]?: Resolver } = {};
  active = false;

  constructor(world: WorldManager, workerCtor: WorkerConstructor) {
    this.world = world;
    this.canvas = world.canvas;
    this.input = world.input;
    this.worker = new workerCtor();
    this.worker.onmessage = (e) => this.__receive(e.data);
  }

  setActive(bool: boolean) {
    this.active = bool;
  }

  waitForMessage(messageType: WorkerMessageType): Promise<any> {
    let resolver = this.messagePromises[messageType];
    if (!resolver) {
      const newRes = {} as Resolver;
      newRes.promise = new Promise(function (resolve) {
        newRes.resolve = resolve;
      });
      resolver = this.messagePromises[messageType] = newRes;
    }
    return resolver.promise;
  }
  sendAndWait(message: BasicEngineMessage, messageType: WorkerMessageType) {
    return new Promise(resolve => {
      this.waitForMessage(messageType).then(resolve);
      this.send(message);
    })
  }

  private __receive(message: BasicWorkerMessage) {
    const resolver = this.messagePromises[message.type];
    if (resolver) {
      delete this.messagePromises[message.type];
      resolver.resolve();
    }
    if (message.type === "set_self_to_idle") {
      this.world.setIdle(this);
    }
    this.receive(message);
  }

  send(message: BasicEngineMessage, transferrable?: any) {
    if (!this.active && message.type === "canvas_resize")
      return;
    this.worker.postMessage(message, transferrable);
  }

  abstract receive(message: BasicWorkerMessage): any;

  async abstract init(): Promise<any>;
  async abstract destroy(): Promise<any>;
  async abstract update(dt: number): Promise<any>;
}
