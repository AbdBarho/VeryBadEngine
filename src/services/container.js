let instances = {};

export default class Container {
  /**
   * @param {String} name
   * @param {any} obj
   */
  static register(name, obj) {
    instances[name] = obj;
  }

  /**
   * @param {String} name
   */
  static get(name) {
    let obj = instances[name];
    if (!obj)
      throw "is not registered" + name;
    return obj;
  }
}
