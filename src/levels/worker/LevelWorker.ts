import ECS from "../../engine/ecs/ECS";
import ILevel from "./ILevel";
import InputReplicator from "./InputReplicator";
import { EngineMessage, WorkerMessage } from "./Messages";
import Vector from "../../engine/math/Vector";
import Vec2 from "../../engine/math/vector/Vec2";

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
      case "canvas_buffer_transmit": {
        assert(this.canvas === null, "Canvas already transmitted");

        this.canvas = message.canvas;
        this.level = new this.levelCtor(this.eventReplicator, this.canvas);
        break;
      }
      case "canvas_resize": {
        assert(this.canvas !== null);
        this.canvas!.width = message.width;
        this.canvas!.height = message.height;
        break;
      }
      case "frame_start": {
        assert(this.level !== null);
        this.eventReplicator.executeQueue();
        this.level!.update(message.dt);
        this.send({ type: "frame_end" });
        break;
      }

      case "input": {
        if (message.name === "mousemove") {
          const pos = message.data[0];
          const mousePos = new Vec2(pos.x, pos.y);
          this.eventReplicator.queueEvent(message.name, mousePos);
        } else {
          this.eventReplicator.queueEvent(message.name, ...message.data);
        }
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


function assert(condition: boolean, ...args: any[]) {
  if (!condition) {
    console.log("ERROR:", ...args);
    throw "ERROR";
  }
}
