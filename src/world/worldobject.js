export default class WorldObject {
  constructor() {
    this.behaviors = {};
    this.activeBehaviors = {};
  }

  addBehavior(behavior) {
    this.behaviors[behavior.getName()] = behavior;
  }

  removeBehavior(behavior) {
    let name = behavior.getName();
    if (this.activeBehaviors[name])
      this.deactivateBehavior(name);
    delete this.behaviors[name];
  }

  activateBehavior(name) {
    this.activeBehaviors[name] = this.behaviors[name];
    this.behaviors[name].activate();
  }

  activateBehaviorOnly(name) {
    this.deactivateAllActiveBehaviors();
    this.activateBehavior(name);
  }

  deactivateBehavior(name) {
    this.activeBehaviors[name].deactivate();
    delete this.activeBehaviors[name];
  }

  deactivateAllActiveBehaviors() {
    let active = Object.keys(this.activeBehaviors);
    for (let i = 0; i < active.length; i++)
      this.deactivateBehavior(active[i]);
  }

  getActiveBehaviors() {
    return Object.keys(this.behaviors).reduce((obj, key) => obj[key] = this.behaviors[key], {});
  }

  getBehaviorNames() {
    return Object.keys(this.behaviors);
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

  getBoundingRect() {
    throw "not implemented";
  }

  getRenderingCommand() {
    throw "not implemented";
  }
}