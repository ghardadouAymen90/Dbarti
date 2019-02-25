import { combineReducers } from "redux";
import authReducer from "./authReducers";
import profile from "./ProfileReducers";
import recipe from "./recipeReducers";
import errorReducer from "./errorReducers";
export default combineReducers({
  profile: profile,
  auth: authReducer,
  recipe:recipe,
  errors: errorReducer
});
