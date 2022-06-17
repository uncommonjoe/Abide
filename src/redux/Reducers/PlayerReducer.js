import { SET_SOUND } from "../Constants";

const initialState = {
  sound: null,
};

export default function PlayerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SOUND:
      return {
        ...state,
        sound: action.payload,
      };

    default:
      break;
  }
  return state;
}
