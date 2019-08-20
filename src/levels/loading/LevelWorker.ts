import InputReplicator from "../worker/InputReplicator";
import LevelWorker from "../worker/LevelWorker";
import { BasicEngineMessage, BasicWorkerMessage } from '../worker/types/MessageTypes';
import LoadingLevel from "./Level";

export default class LoadingWorker extends LevelWorker {
  input = new InputReplicator();
  canvas: OffscreenCanvas | null = null;
  level: LoadingLevel | null = null;

  receive(message: BasicEngineMessage) {
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
        this.level = new LoadingLevel(this);
        this.send({ type: "init_done" });
        return;
      }
      case "all_levels_init": {
        this.level!.fade();
        return
      }

      default:
        throw "Unknown or unimplemented message type: " + message.type;
    }

  }

}
