import axios from "axios";

import { FETCH_COMMENTS_SUCCESS, FETCH_COMMENTS_ERROR, ERRORS } from "../types";

export const AddComment = (idUser, id, comment) => async (dispatch) => {
  await axios
    .post(`https://he-bosses-pi-dev-api.onrender.com/comment/addComment`, {
      username: idUser,
      product: id,
      comments: { comment },
    })
    .then((res) => {
      dispatch({
        type: ERRORS,
        payload: {},
      });
    })
    .catch((err) => {
      dispatch({
        type: ERRORS,
        payload: err.response.data,
      });
    });
};

export const fetchComments = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
        "https://he-bosses-pi-dev-api.onrender.com/comment/getComments/" + id
    );
    dispatch({
      type: FETCH_COMMENTS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_COMMENTS_ERROR,
      payload: error.message,
    });
  }
};
