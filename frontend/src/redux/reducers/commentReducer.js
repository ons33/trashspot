import {
    FETCH_COMMENTS_SUCCESS,
    FETCH_COMMENTS_ERROR,
    SET_COMMENT
  } from "../types";
  
  const initialState = {
    comment: {},
    comments: [],
    error: null,
  };
  // eslint-disable-next-line import/no-anonymous-default-export
  export default function (state = initialState, action) {
    switch (action.type) {
      case SET_COMMENT:
        return {
          ...state,
          comment: action.payload,
        };
      case FETCH_COMMENTS_SUCCESS:
        return {
          ...state,
          comments: action.payload,
        };
      case FETCH_COMMENTS_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  }
  