import EventManager from "../services/eventmanager";

interface NumberKeysMapperCallback {
  (num: number, i: number): void
}


export default class NumberKeysMapper {
  nums: number[];
  callbacks: (() => void)[] = [];
  constructor(callback: NumberKeysMapperCallback, nums: number[], context?: any) {
    this.nums = nums || Array(10).fill(0).map((_, i) => i);
      for(let i = 0; i < this.nums.length; ++i) {
      let num = this.nums[i];
      let helper = () => callback.call(context, num, num - 1);
      EventManager.on("input_keydown_Digit" + num, helper, context);
      this.callbacks.push(helper);
    }
  }

  destroy() {
    for (let i = 0; i < this.nums.length; ++i)
      EventManager.off("input_keydown_Digit" + this.nums[i], this.callbacks[i]);
    this.callbacks = [];
  }
}