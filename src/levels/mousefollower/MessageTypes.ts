import { V2 } from "../../engine/math/VectorTypes";

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

export type MFEngineMessage = CanvasBufferTransmitMessage | CanvasResizeMessage | StartFrameMessage | InputEventMessage | DestroyLevelMessage;


interface FrameEndMessage {
  type: "frame_end"
}

export type MFWorkerMessage = FrameEndMessage;
