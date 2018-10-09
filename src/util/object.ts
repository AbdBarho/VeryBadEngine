export default class ObjectUtils {
  static isEmpty(obj: any) {
    for (let _ in obj)
      return false;
    return true;
  }
}