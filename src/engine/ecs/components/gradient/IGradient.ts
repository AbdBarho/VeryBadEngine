import { GradientData } from "../../../core/canvas/layers/Frame";

export default interface IGradient {
  update: (dt: number) => void;
  getFillStyle: () => GradientData;
}
