class EventManager {
  __listeners__ : any = {};
  /**
   * register event listerner
   * @param event event name
   * @param callback the callback function
   * @param context this context for the method
   */
  on(event: string, callback: Function, context?: any) {
    this.__listeners__[event] = this.__listeners__[event] || [];
    this.__listeners__[event].push({ callback, context });
  }
  /**
   * register event listerner. will be called only once, then unregistered.
   * @param event event name
   * @param callback the callback function
   * @param context
   */
  once(event: string, callback: Function, context?: any) {
    let helper = () => {
      callback.apply(context, arguments);
      this.off(event, helper);
    };
    this.on(event, helper, context);
  }
  /**
   * unregister event handler.
   * @param event the event name
   * @param callback the callback
   */
  off(event: string, callback: Function) {
    let callbacks = this.__listeners__[event];
    for (let i = 0; i < callbacks.length; i++)
      if (callbacks[i].callback === callback)
        callbacks.splice(i, 1);
  }
  /**
   * trigger an event
   * @param event event name
   * @param args callback arguments
   */
  trigger(event: string, ...args: any[]) {
    let callbacks = this.__listeners__[event] || [];
    for (let i = 0; i < callbacks.length; i++)
      if (callbacks[i].callback)
        callbacks[i].callback.apply(callbacks[i].context, args);
  }
}

let instance = new EventManager();
export default instance;