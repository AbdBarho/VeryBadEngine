export type CanvasBufferTransmitMessage = {
  type: "canvas_buffer_transmit"
  canvas: OffscreenCanvas
}

export type CanvasResizeMessage = {
  type: "canvas_resize"
  width: number,
  height: number
}

export type StartFrameMessage = {
  type: "frame_start"
  dt: number
}

export type InputEventMessage = {
  type: "input"
  name: string;
  data: any[];
}

export type DestroyLevelMessage = {
  type: "destroy"
}
export type EngineMessage = CanvasBufferTransmitMessage | CanvasResizeMessage | StartFrameMessage | InputEventMessage
  | DestroyLevelMessage;


export type FrameEndMessage = {
  type: "frame_end"
}

export type WorkerMessage = FrameEndMessage;
