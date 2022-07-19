export const SET_CANVAS_PIXELS = "SET_CANVAS_PIXELS";

export function setCanvasPixelsData(data) {
  return {
    type: SET_CANVAS_PIXELS,
    payload: data,
  };
}
