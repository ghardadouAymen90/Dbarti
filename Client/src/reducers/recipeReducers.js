import {
  ADD_RECIPE,
  GET_RECIPE,
  GET_ALL_RECIPE,
  LIKE_RECIPE,
  GET_RECIPE_LIKES
} from "../actions/types";
const initialState = {
  recipeSelected: {},
  recipesOfUser: {},
  like: false,
  likes:[]
};
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_RECIPE:
      return {
        state
      };
    case GET_RECIPE:
      return {
        ...state,
        recipeSelected: action.recipeToShow
      };
    case GET_ALL_RECIPE:
      return {
        ...state,
        recipesOfUser: action.allRecipes
      };
    case LIKE_RECIPE:
      return {
        ...state,
        like: action.like
      };
      case GET_RECIPE_LIKES:
      return {
        ...state,
        likes: action.allLikes
      };
    default:
      return state;
  }
}
