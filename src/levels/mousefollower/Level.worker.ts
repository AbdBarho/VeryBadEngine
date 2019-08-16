import LevelWorker from "./LevelWorker";
import { LevelWorkerScope, WorkerConstructor } from "../worker/WorkerTypes";

// weird hacks for typescript
new LevelWorker(self as unknown as LevelWorkerScope);
export default null as unknown as WorkerConstructor;
