export default class EventManager {
  constructor() {
    this.__callbacks__ = {};
  }
  /**
   * register event listerner
   * @param {string} event event name
   * @param {Function} callback the callback function
   */
  on(event, callback) {
    this.__callbacks__[event] = this.__callbacks__[event] || [];
    this.__callbacks__[event].push(callback);
    return this;
  }
  /**
   * register event listerner. will be called only once, then unregistered.
   * @param {string} event event name
   * @param {Function} callback the callback function
   */
  once(event, callback) {
    let helper = () => {
      callback.apply(this, arguments);
      this.off(event, helper);
    };
    this.on(event, helper);
    return this;
  }
  /**
   * unregister event handler.
   * @param {string} event the event name
   * @param {Function} callback the callback
   * @returns {Boolean} if the callback was successfully deleted
   */
  off(event, callback) {
    let callbacks = this.__callbacks__[event];
    let removed = false;
    for (let i = 0; i < callbacks.length; i++) {
      if (callbacks[i] === callback) {
        callbacks.splice(i, 1);
        removed = true;
      }
    }
    if (removed && callbacks.length === 0)
      delete this.__callbacks__[event];
    return removed;
  }
  /**
   * trigger an event
   * @param {string} event event name
   * @param {...any} eventParams further arguments
   * @return {this} this object
   */
  trigger(event, ...eventParams) {
    let callbacks = this.__callbacks__[event];
    if (callbacks)
      for (let callback of callbacks)
        callback.apply(this, eventParams);
    return this;
  }
}
