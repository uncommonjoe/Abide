import { createStore, applyMiddleware } from "redux";
import RootReducer from "./Reducers";
import { createLogger } from "redux-logger";

const Store = createStore(RootReducer, {}, applyMiddleware(createLogger()));

export { Store };
