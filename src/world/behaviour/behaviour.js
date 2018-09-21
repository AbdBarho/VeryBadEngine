export default class Behavior {
  /**
   * @param {String} name
   */
  constructor(name) {
    this.name = name;
    this.storage = {};
  }

  getName() {
    return this.name;
  }

  activate() {
    throw "not implemented";
  }

  deactivate() {
    throw "not implemented";
  }
}