import { combineReducers } from "redux";
import canvasReducer from "./reducer/CanvasReducer";

const reducers = combineReducers({
  canvasReducer: canvasReducer,
});

export default reducers;
