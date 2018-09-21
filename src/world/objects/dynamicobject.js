import StaticObject from "./staticobject";
import Behavior from "../behaviour/behaviour"; //eslint-disable-line no-unused-vars

export default class DynamicObject extends StaticObject {
  constructor(numDims) {
    super(numDims);
    this.__behaviors__ = {};
    this.__activeBehaviors__ = {};
  }

  /**
   *
   * @param {{BEHAVIORS: Behavior[], DEFAULT_BEHAVIOR_INDEX: Number}} config
   */
  initBehaviors(config) {
    let behaviors = config.BEHAVIORS.map(Clazz => new Clazz(this));
    this.addBehaviors(behaviors);
    this.activateBehavior(behaviors[config.DEFAULT_BEHAVIOR_INDEX].getName());
    return behaviors;
  }

  /**
   * @param {Behavior} behavior
   * @returns {Behavior}
   */
  addBehavior(behavior) {
    let name = behavior.getName();
    if (this.__behaviors__[name])
      throw "behavior already registered: " + name;
    this.__behaviors__[name] = behavior;
    return behavior;
  }

  /**
   * @param {Behavior[]} behavior
   * @returns {Behavior[]}
   */
  addBehaviors(behaviors) {
    for (let i = 0; i < behaviors.length; i++)
      this.addBehavior(behaviors[i]);
    return behaviors;
  }
  /**
   * @param {Behavior} behavior
   */
  removeBehavior(behavior) {
    let name = behavior.getName();
    if (this.__activeBehaviors__[name])
      this.deactivateBehavior(name);
    delete this.__behaviors__[name];
  }

  /**
   * @param {String} name
   */
  activateBehavior(name) {
    this.__activeBehaviors__[name] = this.__behaviors__[name];
    this.__behaviors__[name].activate();
  }
  /**
   * @param {String} name
   */
  activateBehaviorOnly(name) {
    let state = this.__activeBehaviors__[name];
    delete this.__activeBehaviors__[name];
    this.deactivateAllActiveBehaviors();
    if (state)
      this.__activeBehaviors__[name] = state;
    else
      this.activateBehavior(name);
  }
  /**
   * @param {String} name
   */
  deactivateBehavior(name) {
    this.__activeBehaviors__[name].deactivate();
    delete this.__activeBehaviors__[name];
  }

  deactivateAllActiveBehaviors() {
    let active = Object.keys(this.__activeBehaviors__);
    for (let i = 0; i < active.length; i++)
      this.deactivateBehavior(active[i]);
  }

  /**
   * @returns {{[name:string]: Behavior}}
   */
  getActiveBehaviors() {
    return Object.assign({}, this.__activeBehaviors__);
  }


  /**
   * @returns {String[]}
   */
  getBehaviorNames() {
    return Object.keys(this.__behaviors__);
  }

  beforeUpdate() {
    //nothing
  }

  update() {
    throw "not implemented";
  }

  afterUpdate() {
    //nothing
  }
}