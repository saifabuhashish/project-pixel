import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import reducers from "./rootReducer";

function configureStore() {
  let store = createStore(reducers, compose(applyMiddleware(thunk)));
  return { store };
}

export default configureStore;
