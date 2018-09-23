import StaticObject, { StaticObjectParameter } from "./staticobject";

export interface DynamicObjectParameter extends StaticObjectParameter {

}

export default class DynamicObject extends StaticObject {
  triggerUpdate(dt: number) {
    let changed = false;
    changed = this.beforeUpdate(dt) || changed;
    changed = this.update(dt) || changed;
    changed = this.afterUpdate(dt) || changed;
    return changed;
  }

  beforeUpdate(dt: number) {
    //nothing yet
    return false;
  }

  update(dt: number) {
    //nothing yet
    return false;
  }

  afterUpdate(dt: number) {
    //nothing yet
    return false;
  }
}