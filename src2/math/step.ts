export default class StepFunctions {
  static smoothStart(num: number, degree: number) {
    let result = num;
    while (--degree > 0)
      result *= num;
    return result;
  }

  static smoothStop(num: number, degree: number) {
    let result = 1 - num;
    while (--degree > 0)
      result *= 1 - num;
    return 1 - result;
  }
}