import { LevelWorkerScope } from './WorkerTypes';

export default abstract class LevelWorker {
  ctx: LevelWorkerScope;
  constructor(workerContext: LevelWorkerScope) {
    this.ctx = workerContext;
    workerContext.onmessage = (e => this.receive(e.data));
  }
  abstract receive(message: any): any;
  abstract send(message: any): any;
}
