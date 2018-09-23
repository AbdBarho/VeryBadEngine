import DynamicObject, { DynamicObjectParameter } from "./dynamicobject";
import Behavior from "../behaviour/behaviour";


export interface BehavingObjectParameter extends DynamicObjectParameter {
  BEHAVIORS: Behavior[]
}

export default class BehavingObject extends DynamicObject {
  private __behaviors__: { [name: string]: Behavior } = {};
  private __activeBehaviors__: { [name: string]: Behavior } = {};

  constructor(params: BehavingObjectParameter) {
    super(params);
    //init behaviors
    let behaviors = params.BEHAVIORS.map((Clazz: any) => new Clazz(this));
    for (let i = 0; i < behaviors.length; i++)
      this.addBehavior(behaviors[i]);
  }


  addBehavior(behavior: Behavior) {
    let name = behavior.getName();
    if (this.__behaviors__[name])
      throw "behavior already registered: " + name;
    this.__behaviors__[name] = behavior;
    return behavior;
  }

  removeBehavior(behavior: Behavior) {
    let name = behavior.getName();
    if (this.__activeBehaviors__[name])
      this.deactivateBehavior(name);
    delete this.__behaviors__[name];
  }

  activateBehavior(name: string) {
    this.__activeBehaviors__[name] = this.__behaviors__[name];
    this.__behaviors__[name].activate();
  }

  activateBehaviorOnly(name: string) {
    let state = this.__activeBehaviors__[name];
    delete this.__activeBehaviors__[name];
    this.deactivateAllActiveBehaviors();
    if (state)
      this.__activeBehaviors__[name] = state;
    else
      this.activateBehavior(name);
  }

  deactivateBehavior(name: string) {
    this.__activeBehaviors__[name].deactivate();
    delete this.__activeBehaviors__[name];
  }

  deactivateAllActiveBehaviors() {
    let active = Object.keys(this.__activeBehaviors__);
    for (let i = 0; i < active.length; i++)
      this.deactivateBehavior(active[i]);
  }

  getActiveBehaviors() {
    return Object.assign({}, this.__activeBehaviors__);
  }

  getBehaviorNames() {
    return Object.keys(this.__behaviors__);
  }
}