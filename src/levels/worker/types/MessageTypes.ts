import { V2 } from "../../../engine/math/VectorTypes";

interface CanvasBufferTransmitMessage {
  type: "canvas_buffer_transmit"
  canvas: OffscreenCanvas
}

interface CanvasResizeMessage {
  type: "canvas_resize"
  size: V2;
}

interface StartFrameMessage {
  type: "frame_start"
  dt: number
}


interface InputEventMessage {
  type: "input"
  name: string;
  data: any[];
}

interface DestroyLevelMessage {
  type: "destroy"
}

interface InitLevelMessage {
  type: "init_level"
}

interface AllLevelsInitDoneMessage {
  type: "all_levels_init"
}
export type BasicEngineMessage = CanvasBufferTransmitMessage | CanvasResizeMessage | StartFrameMessage | InputEventMessage | InitLevelMessage | DestroyLevelMessage | AllLevelsInitDoneMessage;


interface FrameEndMessage {
  type: "frame_end"
}

interface InitLevelDoneMessage {
  type: "init_done"
}

interface ParkLevelMessage {
  type: "set_self_to_idle"
}

export type BasicWorkerMessage = FrameEndMessage | InitLevelDoneMessage | ParkLevelMessage;
