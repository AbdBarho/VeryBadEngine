type EventHandler = {
  callback: Function;
  context?: any;
}
export default class EventManager {
  __listeners__: { [name: string]: EventHandler[] } = {};
  __all__listeners: EventHandler[] = [];

  on(event: string, callback: Function, context?: any) {
    this.__listeners__[event] = this.__listeners__[event] || [];
    this.__listeners__[event].push({ callback, context });
  }
  
  onAll(callback: Function, context?: any) {
    this.__all__listeners.push({ callback, context })
  }

  once(event: string, callback: Function, context?: any) {
    const helper = (...args: any[]) => {
      callback.apply(context, args);
      this.off(event, helper);
    };
    this.on(event, helper, context);
  }

  off(event: string, callback: Function) {
    const callbacks = this.__listeners__[event];
    for (let i = 0; i < callbacks.length; i++)
      if (callbacks[i].callback === callback)
        callbacks.splice(i--, 1);
  }

  offAll(callback: Function) {
    const handlers = this.__all__listeners;
    for (let i = 0; i < handlers.length; i++)
      if (handlers[i].callback === callback)
        handlers.splice(i--, 1);

  }

  trigger(event: string, ...args: any[]) {
    const callbacks = this.__listeners__[event] || [];
    for (let i = 0; i < callbacks.length; i++)
      callbacks[i].callback.apply(callbacks[i].context, args);

    const all = this.__all__listeners;
    for (let i = 0; i < all.length; i++)
      all[i].callback.apply(all[i].context, [event, ...args]);

  }
}

export interface QueuedEvent {
  event: string;
  parameters: any[]
}

export class QueuedEventManager extends EventManager {
  queue: QueuedEvent[] = [];

  queueEvent(event: string, ...parameters: any[]) {
    this.queue.push({ event, parameters });
  }

  executeQueue() {
    if (this.queue.length === 0)
      return;

    const queue = this.queue;
    this.queue = [];
    for (let i = 0, len = queue.length; i < len; i++) {
      const el = queue[i];
      this.trigger(el.event, ...el.parameters);
    }
  }

  emptyQueue() {
    this.queue = [];
  }
}
