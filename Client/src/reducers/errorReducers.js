import {
  GET_ERRORS,
  ADD_RECIPE_ERROR,
  PROFILE_NOT_FOUND,
  GET_RECIPE_ERROR,
  LIKE_ERROR,
  GET_LIKES_RECIPE_ERROR
} from "../actions/types";
const initialState = {};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case PROFILE_NOT_FOUND:
      return action.error;
    case ADD_RECIPE_ERROR:
      return action.error;
    case GET_RECIPE_ERROR:
      return action.error;
    case LIKE_ERROR:
      return action.error;
      case GET_LIKES_RECIPE_ERROR:
      return action.error;
    default:
      return state;
  }
}
