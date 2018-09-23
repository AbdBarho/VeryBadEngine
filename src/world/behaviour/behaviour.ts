export default class Behavior {
  private name: string;
  getName = () => this.name;

  protected storage: any = {};

  constructor(name: string) {
    this.name = name;
  }


  activate() {
    throw "not implemented";
  }

  deactivate() {
    throw "not implemented";
  }
}