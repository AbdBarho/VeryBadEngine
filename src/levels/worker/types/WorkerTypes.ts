interface WorkerGlobalScopeEventMap {
  "error": ErrorEvent;
}

interface DedicatedWorkerGlobalScopeEventMap extends WorkerGlobalScopeEventMap {
  "message": MessageEvent;
}

interface DedicatedWorkerGlobalScope {
  onmessage: ((this: DedicatedWorkerGlobalScope, ev: MessageEvent) => any) | null;
  close(): void;
  postMessage(message: any, transfer: Transferable[]): void;
  postMessage(message: any, options?: PostMessageOptions): void;
  addEventListener<K extends keyof DedicatedWorkerGlobalScopeEventMap>(type: K, listener: (this: DedicatedWorkerGlobalScope, ev: DedicatedWorkerGlobalScopeEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
  removeEventListener<K extends keyof DedicatedWorkerGlobalScopeEventMap>(type: K, listener: (this: DedicatedWorkerGlobalScope, ev: DedicatedWorkerGlobalScopeEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}


export type LevelWorkerScope = DedicatedWorkerGlobalScope;


export interface WorkerConstructor {
  new(): Worker;
}
