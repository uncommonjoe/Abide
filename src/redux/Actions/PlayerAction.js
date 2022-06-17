import { Component } from "react";
import { SET_SOUND } from "../Constants";

export default class PlayerAction extends Component {
  static SetSound(data) {
    return { type: SET_SOUND, payload: data };
  }
}
