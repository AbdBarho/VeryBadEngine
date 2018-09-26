interface anyFunc { (...params: any[]): any }
export class State {
  private name: string;
  activate: (context: any) => any;
  deactivate: (context: any) => any;
  constructor(name = "NullState", activate: anyFunc = () => { }, deactivate: anyFunc = () => { }) {
    this.name = name;
    this.activate = activate;
    this.deactivate = deactivate;
  }
  getName() {
    return this.name;
  }
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