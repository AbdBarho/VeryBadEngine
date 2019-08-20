import { LevelWorkerScope } from './types/WorkerTypes';
import { BasicEngineMessage, BasicWorkerMessage } from './types/MessageTypes';
import { delay } from '../../engine/util/utils';

export default abstract class LevelWorker {
  ctx: LevelWorkerScope;
  constructor(workerContext: LevelWorkerScope) {
    this.ctx = workerContext;
    workerContext.onmessage = (e => this.receive(e.data));
  }
  abstract receive(message: BasicEngineMessage): any;
  send(message: BasicWorkerMessage) {
    if (message.type === "frame_end")
      return delay(() => this.ctx.postMessage(message));

    this.ctx.postMessage(message);
  }
}
