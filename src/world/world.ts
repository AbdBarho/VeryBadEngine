import MathHelper from "../math/math";
import Config from "../config/config";
import Vector from "../math/vector";
import DynamicObject from "./objects/dynamicobject";
import EventManager from "../services/eventmanager";
import Logger from "../services/logger";

export default class World {
  objects: DynamicObject[] = [];
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
  }

  removeObject(id: number) {
    let obj = this.objects[id];
    this.objects.splice(id, 1);
    obj.destroy();
    EventManager.trigger("render_command", id, null);
    Logger.debugInfo("NumObjects", this.objects.length);
  }

  removeLastObject() {
    this.removeObject(this.objects.length - 1);
  }

  getObjects() {
    return this.objects;
  }

  getRandomPosition() {
    return this.size.map(num => MathHelper.getRandomInt(num));
  }
}
