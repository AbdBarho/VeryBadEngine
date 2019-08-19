import { LevelWorkerScope } from './types/WorkerTypes';
import { BasicEngineMessage, BasicWorkerMessage } from './types/MessageTypes';

export default abstract class LevelWorker {
  ctx: LevelWorkerScope;
  constructor(workerContext: LevelWorkerScope) {
    this.ctx = workerContext;
    workerContext.onmessage = (e => this.receive(e.data));
  }
  abstract receive(message: BasicEngineMessage): any;
  abstract send(message: BasicWorkerMessage): any;
}
