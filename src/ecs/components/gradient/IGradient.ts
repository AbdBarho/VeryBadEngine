import Layer, { FillStyle } from "../../../core/Layer";

export default interface IGradient {
  update: (dt: number) => void;
  getFillStyle: (layer: Layer) => FillStyle;
  getFillDimensions: (layer: Layer) => [number, number, number, number];
}
