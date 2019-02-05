import Vec2 from "./vector/Vec2";
// import Vec from "./vector/Vec";

// interface MapFunction { (val: number, index: number, arr: number[]): number }
// export enum Vecs {
//   Vec2 = "Vec2",
//   Vec = "Vec"
// };

// type VectorClasses = {
//   Vec2: Vec2;
//   Vec: Vec;
// }

export default class Vector {
  // caching to save memory and improve performance
  private static cachedInstances: Vec2[] = [];

  static create(...values: number[]) {
    let cached = this.cachedInstances.pop();
    return cached ? cached.set(...values) : new Vec2(...values);
  }

  static store(...vectors: Vec2[]) {
    this.cachedInstances.push(...vectors);
  }
  static copy(vec: Vec2) {
    let cached = this.cachedInstances.pop();
    return cached ? cached.setVec(vec) : new Vec2(...vec.copyValues());
  }

}
