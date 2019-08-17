import System from "./System";
import { Component } from "../Entity";

type Callback = (dt: number) => any;
export default class CallbackSystem extends System {
  callback: Callback;
  constructor(name: string, required: Component[] = [], notAllowed: Component[] = [], callback: Callback) {
    super(name, required, notAllowed);
    this.callback = callback;
  }

  update(dt: number) {
    return this.callback(dt);
  }
}
