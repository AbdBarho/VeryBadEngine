export class State {
  private name: string;
  constructor(name = "NullState") {
    this.name = name;
  }
  getName() {
    return this.name;
  }
  activate(target: any) { }
  deactivate(target: any) { }
}

export default abstract class StateManager {
  private activeState: State = new State();
  private context: any;
  constructor(context: any) {
    this.context = context;
  }

  activateState(id: number) {
    this.activeState.deactivate(this.context);
    this.activeState = this.getState(id);
    this.activeState.activate(this.context);
  }

  abstract getState(id: number): State;
}