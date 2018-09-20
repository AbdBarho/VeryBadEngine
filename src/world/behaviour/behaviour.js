export default class Behavior {
  /**
   * @param {Strinh} name
   * @param {Function} activator
   * @param {Function} deactivator
   * @param {any} obj
   */
  constructor(name, activator, deactivator = () => {}, obj = {}) {
    this.name = name;
    this.activator = activator;
    this.deactivator = deactivator;
    this.storage = obj;
  }

  getName() {
    return this.name;
  }

  activate(...params) {
    this.activator(this.storage, ...params);
  }

  deactivate(...params) {
    this.deactivator(this.storage, ...params);
  }

}