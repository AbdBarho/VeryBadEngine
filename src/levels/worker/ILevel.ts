import { InputProvider } from "../../engine/core/Inputmanager";
import ECS from "../../engine/ecs/ECS";

export default interface ILevel {
  new(input: InputProvider, canvas: OffscreenCanvas): ECS;
}
