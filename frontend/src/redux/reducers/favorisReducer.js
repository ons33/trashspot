import {
    FETCH_FAVORIS_SUCCESS,
    FETCH_FAVORIS_ERROR,
    SET_FAVORIS
  } from "../types";
  
  const initialState = {
    favoris: {},
    favorisList: [],
    error: null,
  };
  // eslint-disable-next-line import/no-anonymous-default-export
  export default function (state = initialState, action) {
    switch (action.type) {
      case SET_FAVORIS:
        return {
          ...state,
          favoris: action.payload,
        };
      case FETCH_FAVORIS_SUCCESS:
        return {
          ...state,
          favorisList: action.payload,
        };
      case FETCH_FAVORIS_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  }
  