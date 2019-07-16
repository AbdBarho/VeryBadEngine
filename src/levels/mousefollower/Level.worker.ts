import MouseFollowerLevel from "./Level";
import LevelWorker from "../worker/LevelWorker";


const ctx: DedicatedWorkerGlobalScope = self as any;

const worker = new LevelWorker(ctx, MouseFollowerLevel)

// weird hack for typescript
export default null as any as (new () => any);
