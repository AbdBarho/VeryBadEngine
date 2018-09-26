interface Callback {
  func: Function;
  context: any;
}

export default class EventManager {
  private callbacks: Callback[][];
  constructor(length: number) {
    this.callbacks = Array(length).fill([]);
  }

  on(eventID: number, func: Function, context?: any) {
    this.callbacks[eventID].push({
      func,
      context
    });
  }

  off(eventID: number, func: Function) {
    let callbacks = this.callbacks[eventID];
    if (callbacks && callbacks.length)
      for (let i = 0; i < callbacks.length; i++)
        if (callbacks[i].func === func)
          return callbacks.splice(i, 1);
  }

  trigger(eventID: number, ...params: any[]) {
    let callbacks = this.callbacks[eventID];
    if (callbacks && callbacks.length)
      for (let i = 0; i < callbacks.length; i++)
        callbacks[i].func.apply(callbacks[i].context, params);
  }
}