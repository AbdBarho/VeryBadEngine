import Container from "../services/container";

export default class World {
  constructor() {
    this.objects = [];
    Container.register("World", this);
  }



  addObject(obj) {
    this.objects.push(obj);
  }

  getObjects() {
    return this.objects;
  }

  update() {
    for (let obj of this.objects)
      obj.update();
  }

  getDimensions() {
    throw "not implemented";
  }
}
