import { InputProvider } from "../../engine/core/Inputmanager";
import ECS from "../../engine/ecs/ECS";
import InputReplicator from "./InputReplicator";
import { EngineMessage, WorkerMessage } from "./Messages";


export interface ILevel {
  new(input: InputProvider, canvas: OffscreenCanvas): ECS;
}

export default class LevelWorker {
  ctx: DedicatedWorkerGlobalScope;
  eventReplicator: InputReplicator;
  levelCtor: ILevel;

  level: ECS | null = null;
  canvas: OffscreenCanvas | null = null;

  constructor(workerContext: DedicatedWorkerGlobalScope, LevelClass: ILevel) {
    this.ctx = workerContext;
    this.eventReplicator = new InputReplicator();
    this.levelCtor = LevelClass;
    workerContext.onmessage = (e => this.receive(e.data));
  }

  receive(message: EngineMessage) {
    // console.log(message);
    switch (message.type) {

      case "frame_start": {
        this.level!.update(message.dt);
        this.send({ type: "frame_end" });
        break;
      }

      case "input": {
        this.eventReplicator.trigger(message.name, ...message.data);
        break;
      }

      case "canvas_buffer_transmit": {
        this.canvas = message.canvas;
        this.level = new this.levelCtor(this.eventReplicator, this.canvas);
        break;
      }

      case "canvas_resize": {
        const size = message.size;
        this.canvas!.width = size.x;
        this.canvas!.height = size.y;
        break;
      }

      default:
        //@ts-ignore
        throw "Unknown message type: " + message.type;
    }

  }

  send(message: WorkerMessage) {
    this.ctx.postMessage(message);
  }
}
