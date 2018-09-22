import MathHelper from "../math/math";
import Config from "../config/config";

export default class World {
  constructor(params = Config.getConfig("WORLD")) {
    this.objects = [];
    this.size = params.SIZE;
    this.pos = params.POSITION;
  }

  addObject(obj) {
    this.objects.push(obj);
  }

  removeObject(id) {
    let obj = this.objects[id];
    this.objects.splice(id, 1);
    obj.destroy();
  }

  getObjects() {
    return this.objects;
  }

  getRandomPosition() {
    return this.size.map(num => MathHelper.getRandomInt(num));
  }
}
