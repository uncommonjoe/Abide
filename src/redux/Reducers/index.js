import { combineReducers } from "redux";
import PlayerReducer from "./PlayerReducer";

const RootReducer = combineReducers({
  PlayerReducer,
});

export default RootReducer;
