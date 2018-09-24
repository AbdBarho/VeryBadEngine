import MathHelper from "../math/math";
import Config from "../config/config";
import Vector from "../math/vector";
import EventManager from "../services/eventmanager";
import Logger from "../services/logger";
import BoundingBox from "../objects/boundingbox";
import FillRect from "../ui/rendercommands/fillrect";

export default class World {
  objects: BoundingBox[] = [];
  size: Vector;
  pos: Vector;

  constructor(params = Config.getConfig("WORLD")) {
    this.objects = [];
    this.size = params.SIZE;
    this.pos = params.POSITION;
  }

  addObject(obj: any) {
    this.objects.push(obj);
    Logger.debugInfo("NumObjects", this.objects.length);
    return this.objects.length - 1;
  }

  removeObject(id: number) {
    let obj = this.objects[id];
    this.objects.splice(id, 1);
    obj.destroy();
    Logger.debugInfo("NumObjects", this.objects.length);
    return id;
  }

  removeLastObject() {
    return this.removeObject(this.objects.length - 1);
  }

  updateAll(dt: number) {
    for (let i = 0; i < this.objects.length; i++)
      this.objects[i].triggerUpdate(dt);
  }

  getObjects() {
    return this.objects;
  }

  getRandomPosition() {
    return this.size.map(num => MathHelper.getRandomInt(num));
  }
}
