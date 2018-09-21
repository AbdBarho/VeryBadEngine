export default class World {
  constructor() {
    this.objects = [];
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
}
