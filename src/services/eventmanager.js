class EventManager {
  constructor() {
    this.__listeners__ = {};
  }
  /**
   * register event listerner
   * @param {string} event event name
   * @param {Function} callback the callback function
   * @param {any} context this context for the method
   */
  on(event, callback, context) {
    this.__listeners__[event] = this.__listeners__[event] || [];
    this.__listeners__[event].push({ callback, context });
  }
  /**
   * register event listerner. will be called only once, then unregistered.
   * @param {string} event event name
   * @param {Function} callback the callback function
   * @param {any} context
   */
  once(event, callback, context) {
    let helper = () => {
      callback.apply(context, arguments);
      this.off(event, helper);
    };
    this.on(event, helper, context);
  }
  /**
   * unregister event handler.
   * @param {string} event the event name
   * @param {Function} callback the callback
   */
  off(event, callback) {
    let callbacks = this.__listeners__[event];
    for (let i = 0; i < callbacks.length; i++)
      if (callbacks[i].callback === callback)
        callbacks.splice(i, 1);
  }
  /**
   * trigger an event
   * @param {string} event event name
   * @param {...any} args further arguments
   */
  trigger(event, ...args) {
    let callbacks = this.__listeners__[event] || [];
    for (let i = 0; i < callbacks.length; i++)
      if (callbacks[i].callback)
        callbacks[i].callback.apply(callbacks[i].context, args);
  }
}

let instance = new EventManager();
export default instance;