import axios from "axios";
import { GET_PROFILE, PROFILE_NOT_FOUND } from "./types";

//get profile
export const getProfile = id => dispatch => {
  axios
    .get(`/api/users/user/${id}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        currentUser: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: PROFILE_NOT_FOUND,
        error: err.response.data
      });
    });
};
