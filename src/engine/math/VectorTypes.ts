export type V2 = {
  x: number;
  y: number;
}
export function getV2(x = 0, y = 0): V2 {
  return { x, y };
}

export function setV2(target: V2, source: V2): void {
  target.x = source.x;
  target.y = source.y;
}
