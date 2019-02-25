import {GET_PROFILE } from "../actions/types";
const initialState = {
  current: {}
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        current: action.currentUser
      };
    default:
      return state
  }
}
