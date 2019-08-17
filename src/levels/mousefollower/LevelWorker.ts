import InputReplicator from "../worker/InputReplicator";
import LevelWorker from "../worker/LevelWorker";
import MouseFollowerLevel from "./Level";
import { MFEngineMessage, MFWorkerMessage } from "./types/MessageTypes";

export default class MouseFollowerWorker extends LevelWorker {
  input = new InputReplicator();
  canvas: OffscreenCanvas | null = null;
  level: MouseFollowerLevel | null = null;

  receive(message: MFEngineMessage) {
    // console.log(message);
    switch (message.type) {

      case "frame_start": {
        this.level!.update(message.dt);
        this.send({ type: "frame_end" });
        return;
      }

      case "input": {
        this.input.trigger(message.name, ...message.data);
        return;
      }

      case "canvas_buffer_transmit": {
        this.canvas = message.canvas;
        this.level = new MouseFollowerLevel(this);
        return;
      }

      case "canvas_resize": {
        const size = message.size;
        this.canvas!.width = size.x;
        this.canvas!.height = size.y;
        this.level!.drawLastFrame();
        return;
      }

      default:
        //@ts-ignore
        throw "Unknown message type: " + message.type;
    }

  }

  send(message: MFWorkerMessage) {
    this.ctx.postMessage(message);
  }
}
