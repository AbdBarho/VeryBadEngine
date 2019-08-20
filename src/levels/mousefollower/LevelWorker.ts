import InputReplicator from "../worker/InputReplicator";
import LevelWorker from "../worker/LevelWorker";
import MouseFollowerLevel from "./Level";
import { BasicEngineMessage, BasicWorkerMessage } from '../worker/types/MessageTypes';
import Config from './Config';

export default class MouseFollowerWorker extends LevelWorker {
  input = new InputReplicator();
  canvas: OffscreenCanvas | null = null;
  level: MouseFollowerLevel | null = null;

  receive(message: BasicEngineMessage) {
    // console.log(message);
    switch (message.type) {

      case "frame_start": {
        this.level!.update(message.dt);
        //push to the end of the browsers execution queue
        setTimeout(() => this.send({ type: "frame_end" }), 0);
        return;
      }

      case "input": {
        this.input.trigger(message.name, ...message.data);
        return;
      }

      case "canvas_resize": {
        const size = message.size;
        this.canvas!.width = size.x;
        this.canvas!.height = size.y;
        if (this.level)
          this.level.drawLastFrame();
        return;
      }

      case "canvas_buffer_transmit": {
        this.canvas = message.canvas;
        return;
      }

      case "init_level": {
        this.level = new MouseFollowerLevel(this);
        this.send({ type: "init_done" });
        return;
      }

      case "all_levels_init":
        this.input.trigger("mousemove", { x: Config.WORLD.SIZE.x, y: Config.WORLD.SIZE.y });
        return;

      default:
        throw "Unknown or unimplemented message type: " + message.type;
    }

  }

  send(message: BasicWorkerMessage) {
    this.ctx.postMessage(message);
  }
}
