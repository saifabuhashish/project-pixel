import { SET_CANVAS_PIXELS } from "../action/CanvasAction";

const initialState = {
  canvasPixels: [],
};

const canvasReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CANVAS_PIXELS: {
      return {
        ...state,
        canvasPixels: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default canvasReducer;
