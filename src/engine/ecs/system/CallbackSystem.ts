import System from "./System";
import { ComponentName as CN } from "../Entity";

type Callback = (dt: number) => any;
export default class CallbackSystem extends System {
  callback: Callback;
  constructor(name: string, required: CN[] = [], notAllowed: CN[] = [], callback: Callback) {
    super(name, required, notAllowed);
    this.callback = callback;
  }

  update(dt: number) {
    return this.callback(dt);
  }
}
