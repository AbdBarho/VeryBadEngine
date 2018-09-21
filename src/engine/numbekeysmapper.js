import EventManager from "../services/eventmanager";

export default class NumberKeysMapper {
  /**
   * @param {(num: Number, i: Number) => void} callback
   * @param {Number[]} nums
   * @param {Object} context
   */
  constructor(callback, nums , context) {
    this.nums = nums || Array(10).fill().map((_, i) => i);
    this.callbacks = [];
    for (let i = 0; i < this.nums.length; ++i) {
      let num = this.nums[i];
      let helper = () => callback.call(context, num, num - 1);
      EventManager.on("input_keydown_Digit" + num, helper, context);
      this.callbacks.push(helper);
    }
  }

  destroy() {
    for (let i = 0; i < this.nums.length; ++i)
      EventManager.off("input_keydown_Digit" + this.nums[i], this.callbacks[i]);
  }
}