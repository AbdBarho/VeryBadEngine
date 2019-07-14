import Frame, { FillStyle } from "../../../core/canvas/layers/Frame";

export default interface IGradient {
  update: (dt: number) => void;
  getFillStyle: (frame: Frame) => FillStyle;
  getFillDimensions: (frame: Frame) => [number, number, number, number];
}
