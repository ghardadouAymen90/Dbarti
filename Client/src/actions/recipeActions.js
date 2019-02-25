import axios from "axios";
import {
  ADD_RECIPE,
  ADD_RECIPE_ERROR,
  GET_RECIPE,
  GET_RECIPE_ERROR,
  GET_ALL_RECIPE,LIKE_RECIPE,
  LIKE_ERROR,
  GET_RECIPE_LIKES,
  GET_LIKES_RECIPE_ERROR
} from "./types";

//add recipe
export const addRecipe = (recipeData, history) => dispatch => {
  axios
    .post("/api/recipes/addRecipe", recipeData)
    .then(res => {
      dispatch({
        type: ADD_RECIPE,
        recipe: res.data
      });
      window.Materialize.toast(
        "Thank you for sharing your recipe with us!",
        4000,
        "orange"
      );
      history.push("/Dashboard");
    })
    .catch(err => {
      dispatch({
        type: ADD_RECIPE_ERROR,
        error: err.response.data
      });
      window.Materialize.toast("Empty Required field(s)", 4000, "red darken-3");
    });
};

//get one recipe
export const getRecipe = recipeID => dispatch => {
  axios
    .get(`/api/recipes/recipe/${recipeID}`)
    .then(res => {
      dispatch({
        type: GET_RECIPE,
        recipeToShow: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_RECIPE_ERROR,
        error: err.response.data
      });
    });
   };



//get all recipes of a user
export const getUserRecipes = (ID) => dispatch => {
  axios
    .get(`/api/recipes/${ID}/recipeOfUser/`)
    .then(res => {
      dispatch({
        type: GET_ALL_RECIPE,
        allRecipes: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_RECIPE_ERROR,
        error: err.response.data
      });
    });
};

//like a recipe
export const like = (userId,recipeId) => dispatch => {
  axios
    .post(`/api/recipes/${userId}/recipe/${recipeId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_RECIPE,
        like: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: LIKE_ERROR,
        error: err.response.data
      });
    });
};

//like a recipe
export const unlike = (userId,recipeId) => dispatch => {
  axios
    .post(`/api/recipes/${userId}/recipe/${recipeId}/unlike`)
    .then(res => {
      dispatch({
        type: LIKE_RECIPE,
        like: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: LIKE_ERROR,
        error: err.response.data
      });
    });
};


//get the likes of a recipe
export const getLikes = (recipeId) => dispatch => {
  axios
    .get(`/api/recipes/${recipeId}/getLikes`)
    .then(res => {
      dispatch({
        type: GET_RECIPE_LIKES,
        allLikes: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_LIKES_RECIPE_ERROR,
        error: err.response.data
      });
    });
};
